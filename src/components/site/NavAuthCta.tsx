import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetStartedButton } from "@/components/site/GetStartedButton";
import { ApiError, fetchWorkspaces } from "@/lib/api";
import {
  SESSION_HINT_KEY,
  getSessionHint,
  hasSession,
  storeSessionHint,
  type SessionHint,
} from "@/lib/auth";

type NavAuthCtaProps = {
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
};

/**
 * Nav call to action. Visitors get "Get Started for Free"; anyone with a live
 * session gets "Continue as <workspace>" straight into the dashboard.
 *
 * The cached hint renders instantly so the button never flickers, then a
 * workspace fetch confirms the session is still good and refreshes the name.
 * A dead session clears the tokens inside `apiFetch`, so we fall back to the
 * signup CTA.
 */
export function NavAuthCta({ fullWidth = false, className = "", onClick }: NavAuthCtaProps) {
  const [hint, setHint] = useState<SessionHint | null>(() =>
    hasSession() ? getSessionHint() : null,
  );

  useEffect(() => {
    if (!hasSession()) {
      setHint(null);
      return;
    }

    let cancelled = false;

    void (async () => {
      try {
        const memberships = await fetchWorkspaces();
        if (cancelled) return;

        const current = memberships.find((membership) => membership.isCurrent) ?? memberships[0];
        if (!current) {
          setHint(null);
          return;
        }

        const next = { workspaceId: current.workspaceId, workspaceName: current.name };
        storeSessionHint(next);
        setHint(next);
      } catch (error) {
        if (cancelled) return;
        // 401 means the tokens are spent and already cleared; anything else
        // (backend down, offline) shouldn't punish a user who is signed in.
        if (error instanceof ApiError && error.status === 401) setHint(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Keep tabs in sync when the user signs out or switches workspace elsewhere.
  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key !== null && event.key !== SESSION_HINT_KEY) return;
      setHint(hasSession() ? getSessionHint() : null);
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (!hint) {
    return (
      <GetStartedButton
        variant="nav"
        fullWidth={fullWidth}
        className={className}
        onClick={onClick}
      />
    );
  }

  const classes = [
    "inline-flex h-10 shrink-0 cursor-pointer items-center gap-2.5 rounded-full border-[1.25px]",
    "border-solid border-[#1a182b] bg-[#1a182b] py-1 pr-5 pl-1 text-sm font-medium text-white",
    "tracking-[-0.14px] transition-transform hover:translate-y-px",
    fullWidth ? "flex w-full justify-center" : "max-w-[280px]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      to="/dashboard"
      onClick={onClick}
      className={classes}
      title={`Continue as ${hint.workspaceName}`}
    >
      <span
        aria-hidden
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-bold text-white"
      >
        {hint.workspaceName.charAt(0).toUpperCase() || "?"}
      </span>
      <span className="min-w-0 truncate">Continue as {hint.workspaceName}</span>
    </Link>
  );
}
