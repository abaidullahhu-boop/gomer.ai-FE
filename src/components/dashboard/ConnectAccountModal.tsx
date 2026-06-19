import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Lock, Users, X } from "lucide-react";
import type { IntegrationAccessLevel } from "@/lib/api";
import type { ConnectOptions } from "@/lib/pipedream";
import { Dropdown, type DropdownOption } from "./Dropdown";

type ConnectAccountModalProps = {
  open: boolean;
  appName: string;
  onClose: () => void;
  onConfirm: (options: ConnectOptions) => void;
};

const ACCESS_OPTIONS: readonly DropdownOption[] = [
  { value: "team", label: "Team-only", icon: Users },
  { value: "private", label: "Private (Invite only)", icon: Lock },
];

/**
 * Captures the nickname + access level for a new connection before the
 * Pipedream popup opens. Access level can't be changed afterward (it decides
 * which Pipedream scope the account lives under), so it's chosen up front.
 */
export function ConnectAccountModal({
  open,
  appName,
  onClose,
  onConfirm,
}: ConnectAccountModalProps) {
  const [nickname, setNickname] = useState("");
  const [accessLevel, setAccessLevel] = useState<IntegrationAccessLevel>("team");
  const inputRef = useRef<HTMLInputElement>(null);
  const nicknameId = useId();

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
      setNickname("");
      setAccessLevel("team");
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

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
        aria-label={`Connect another ${appName} account`}
        className="relative w-full max-w-lg rounded-md border border-border bg-popover p-6 text-foreground outline-none transition-all duration-200 ease-out"
      >
        <button
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          className="gomer-focus-ring absolute top-4 right-4 inline-flex size-10 min-h-10 cursor-pointer select-none items-center justify-center rounded-[7px] border-0 bg-transparent text-muted-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-accent active:scale-[0.98]"
        >
          <X className="size-4" strokeWidth={1.5} />
        </button>

        <div className="flex w-full flex-col gap-4">
          <div className="font-body text-lg font-medium leading-lg tracking-lg text-foreground">
            Connect another {appName} account
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <label
              htmlFor={nicknameId}
              className="select-none text-xs font-medium leading-xs text-muted-foreground"
            >
              Nickname for this account
            </label>
            <input
              ref={inputRef}
              id={nicknameId}
              type="text"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              placeholder={`e.g. Team's ${appName}`}
              autoComplete="off"
              maxLength={255}
              className="gomer-focus-ring h-10 w-full rounded-[7px] border border-border bg-secondary px-3 text-sm text-foreground outline-0 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring placeholder:text-muted-foreground"
            />
            <span className="text-xs text-muted-foreground">
              Just a label to tell your accounts apart.
            </span>
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <span className="select-none text-xs font-medium leading-xs text-muted-foreground">
              Who should have access?
            </span>
            <Dropdown
              aria-label="Who should have access?"
              value={accessLevel}
              options={ACCESS_OPTIONS}
              onChange={(value) => setAccessLevel(value as IntegrationAccessLevel)}
            />
          </div>

          <button
            type="button"
            onClick={() => onConfirm({ accessLevel, nickname: nickname.trim() || undefined })}
            className="gomer-focus-ring inline-flex min-h-10 w-full cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] border-0 bg-btn-primary px-4 py-2 text-sm font-medium text-btn-primary transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            Continue to {appName}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
