import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Check, UserCheck, X } from "lucide-react";
import { ApiError, inviteTeamMembers, type InviteResult } from "@/lib/api";

type InviteTeamMembersModalProps = {
  open: boolean;
  onClose: () => void;
  /** Called once per batch in which at least one person was added. */
  onInvited?: () => void;
};

function ResultIcon({ status }: { status: InviteResult["status"] }) {
  if (status === "invited") {
    return <Check className="size-4 shrink-0 text-foreground" strokeWidth={1.5} aria-hidden />;
  }
  if (status === "already_member") {
    return (
      <UserCheck className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden />
    );
  }
  return (
    <AlertTriangle
      className="size-4 shrink-0 text-muted-foreground"
      strokeWidth={1.5}
      aria-hidden
    />
  );
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseEmails(value: string): string[] {
  return value
    .split(/[,;\s]+/)
    .map((email) => email.trim())
    .filter(Boolean);
}

function EmailChip({ email, onRemove }: { email: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-sm text-foreground">
      {email}
      <button
        type="button"
        aria-label={`Remove ${email}`}
        onClick={onRemove}
        className="gaspo-focus-ring inline-flex size-4 cursor-pointer items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <X className="size-3" strokeWidth={1.5} />
      </button>
    </span>
  );
}

export function InviteTeamMembersModal({ open, onClose, onInvited }: InviteTeamMembersModalProps) {
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<InviteResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const emailInputId = useId();
  const emailLabelId = useId();

  const pendingEmails = parseEmails(inputValue);
  const hasValidInput = pendingEmails.some((email) => EMAIL_PATTERN.test(email));
  const canInvite = emails.length > 0 || hasValidInput;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setEmails([]);
      setInputValue("");
      setSubmitting(false);
      setResults([]);
      setError(null);
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  function addEmails(raw: string[]) {
    const next = raw
      .map((email) => email.trim().toLowerCase())
      .filter((email) => EMAIL_PATTERN.test(email));

    if (next.length === 0) return;

    setEmails((current) => {
      const seen = new Set(current);
      const merged = [...current];
      for (const email of next) {
        if (!seen.has(email)) {
          seen.add(email);
          merged.push(email);
        }
      }
      return merged;
    });
  }

  function commitInput() {
    const parsed = parseEmails(inputValue);
    if (parsed.length === 0) return;
    addEmails(parsed);
    setInputValue("");
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === "," || event.key === "Tab") {
      if (inputValue.trim()) {
        event.preventDefault();
        commitInput();
      }
      return;
    }

    if (event.key === "Backspace" && !inputValue && emails.length > 0) {
      setEmails((current) => current.slice(0, -1));
    }
  }

  function handleInvite() {
    const allEmails = [...emails];
    const parsed = parseEmails(inputValue);
    for (const email of parsed) {
      const normalized = email.trim().toLowerCase();
      if (EMAIL_PATTERN.test(normalized) && !allEmails.includes(normalized)) {
        allEmails.push(normalized);
      }
    }

    if (allEmails.length === 0) return;

    setSubmitting(true);
    setError(null);
    inviteTeamMembers(allEmails)
      .then((batch) => {
        // Keep the dialog open: the per-address outcome is the whole point.
        setResults(batch);
        setEmails([]);
        setInputValue("");
        if (batch.some((result) => result.status === "invited")) onInvited?.();
      })
      .catch((err: unknown) => {
        if (err instanceof ApiError && err.status === 403) {
          setError("Only workspace admins can invite members.");
        } else if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Could not send the invites. Check your connection and try again.");
        }
      })
      .finally(() => setSubmitting(false));
  }

  if (!open) return null;

  return createPortal(
    <div className="dashboard-shell fixed inset-0 z-50 grid place-items-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-[opacity,backdrop-filter] duration-150"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Invite team members"
        className="relative w-full max-w-lg rounded-md border border-border bg-popover p-6 text-foreground outline-none transition-all duration-200 ease-out"
      >
        <button
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          className="gaspo-focus-ring absolute top-4 right-4 inline-flex size-10 min-h-10 cursor-pointer select-none items-center justify-center rounded-[7px] border-0 bg-transparent text-muted-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-accent active:scale-[0.98]"
        >
          <X className="size-4" strokeWidth={1.5} />
        </button>

        <div className="flex max-h-[85vh] w-full flex-col gap-4">
          <div className="space-y-2">
            <div className="font-body text-lg font-medium leading-lg tracking-lg text-foreground">
              Invite team members
            </div>
            <div className="text-sm text-muted-foreground">
              Add people from your Slack workspace by the email on their Slack account. Each one
              joins right away and gets a Slack DM from Gaspo with where to sign in. There are no
              per-seat fees on Gaspo&apos;s credit plans.
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex w-full flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={emailInputId}
                  id={emailLabelId}
                  className="select-none text-xs font-medium leading-xs text-muted-foreground"
                >
                  Email(s)
                </label>
              </div>
              <div
                className="gaspo-focus-ring flex min-h-10 flex-wrap items-center gap-1.5 rounded-[7px] border border-border bg-secondary px-3 py-[5px] text-base outline-0 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring"
                onClick={() => inputRef.current?.focus()}
              >
                {emails.map((email) => (
                  <EmailChip
                    key={email}
                    email={email}
                    onRemove={() =>
                      setEmails((current) => current.filter((item) => item !== email))
                    }
                  />
                ))}
                <input
                  ref={inputRef}
                  id={emailInputId}
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={handleInputKeyDown}
                  onBlur={commitInput}
                  placeholder={emails.length === 0 ? "e.g. alice@company.com" : ""}
                  autoComplete="off"
                  spellCheck={false}
                  autoCorrect="off"
                  autoCapitalize="none"
                  aria-labelledby={emailLabelId}
                  role="combobox"
                  aria-expanded={false}
                  aria-haspopup="listbox"
                  aria-autocomplete="list"
                  className="h-7 min-w-[80px] flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {error ? (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}

            {results.length > 0 ? (
              <ul className="flex flex-col gap-2 rounded-[7px] border border-border bg-secondary p-3">
                {results.map((result) => (
                  <li key={result.email} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5">
                      <ResultIcon status={result.status} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-foreground">
                        {result.email}
                      </span>
                      <span className="block text-muted-foreground">{result.message}</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                disabled={!canInvite || submitting}
                onClick={handleInvite}
                data-loading={submitting}
                className="gaspo-focus-ring inline-flex min-h-10 flex-1 cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] border-0 bg-btn-primary px-4 py-2 text-sm font-medium text-btn-primary transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 data-[loading=true]:cursor-wait"
              >
                {submitting ? "Inviting…" : results.length > 0 ? "Invite more" : "Invite"}
              </button>
              {results.length > 0 ? (
                <button
                  type="button"
                  onClick={onClose}
                  className="gaspo-focus-ring inline-flex min-h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] border border-border bg-transparent px-4 py-2 text-sm font-medium text-secondary-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-accent active:scale-[0.98]"
                >
                  Done
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
