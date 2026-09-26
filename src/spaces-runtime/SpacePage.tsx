import { useEffect, useRef, useState } from "react";
import { PageMeta } from "@/components/PageMeta";
import { fetchPage, savePageState } from "./client";
import { buildPageDocument, isPageStateMessage } from "./page-document";
import type { PublicSpace } from "./types";

/** How long a page's saves to one key settle before they are sent. */
const SAVE_DELAY_MS = 400;

/**
 * A page Gaspo wrote, shown full screen. The page runs in a sandboxed frame
 * (see page-document.ts); this component loads it, and saves what the page
 * asks to remember.
 */
export function SpacePage({ space, onSignOut }: { space: PublicSpace; onSignOut: () => void }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [doc, setDoc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saveFailed, setSaveFailed] = useState(false);

  useEffect(() => {
    fetchPage(space.slug)
      .then((page) => setDoc(buildPageDocument(page.html, page.state)))
      .catch((err: Error) => setError(err.message));
  }, [space.slug]);

  // Saves are held briefly per key, so typing into a calculator input sends its
  // final value rather than one request per keystroke.
  useEffect(() => {
    const pending = new Map<string, unknown>();
    const timers = new Map<string, number>();

    function send(key: string, keepalive = false) {
      window.clearTimeout(timers.get(key));
      timers.delete(key);
      if (!pending.has(key)) return;
      const value = pending.get(key);
      pending.delete(key);
      savePageState(space.slug, key, value ?? null, keepalive)
        .then(() => setSaveFailed(false))
        .catch(() => setSaveFailed(true));
    }
    function sendAll() {
      for (const key of [...pending.keys()]) send(key, true);
    }
    function onMessage(event: MessageEvent) {
      // Only the page's own frame may save, and only in the shape it was given.
      if (event.source !== frameRef.current?.contentWindow) return;
      if (!isPageStateMessage(event.data)) return;
      const { key, value } = event.data;
      pending.set(key, value);
      window.clearTimeout(timers.get(key));
      timers.set(
        key,
        window.setTimeout(() => send(key), SAVE_DELAY_MS),
      );
    }

    window.addEventListener("message", onMessage);
    window.addEventListener("pagehide", sendAll);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("pagehide", sendAll);
      sendAll();
    };
  }, [space.slug]);

  return (
    <>
      <PageMeta title={space.name} />
      <div className="space-runtime fixed inset-0 bg-background font-sans">
        {error ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-sm">
            <p className="max-w-[320px] text-muted-foreground">{error}</p>
            <button
              type="button"
              onClick={onSignOut}
              className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground"
            >
              Sign in again
            </button>
          </div>
        ) : doc === null ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Loading…
          </div>
        ) : (
          <iframe
            ref={frameRef}
            title={space.name}
            srcDoc={doc}
            // Never add allow-same-origin: the page is generated code, and without
            // it the frame is an opaque origin that cannot read this site's storage.
            sandbox="allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-downloads"
            className="h-full w-full border-0"
          />
        )}
        {saveFailed && (
          <p
            role="alert"
            className="fixed bottom-3 left-3 rounded-lg border border-border bg-background px-3 py-2 text-xs text-destructive shadow-sm"
          >
            Couldn’t save your last change. Check your connection and try again.
          </p>
        )}
        <a
          href="/"
          target="_blank"
          rel="noopener"
          className="fixed bottom-3 right-3 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur hover:text-foreground"
        >
          Made with Gaspo
        </a>
      </div>
    </>
  );
}
