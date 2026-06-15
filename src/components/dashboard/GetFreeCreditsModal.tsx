import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Gift, Link as LinkIcon, MessageCircle, Send, X } from "lucide-react";
import { billingData } from "@/data/billing";

type Tab = "invite" | "rewards";

type GetFreeCreditsModalProps = {
  open: boolean;
  onClose: () => void;
};

const howItWorksSteps = [
  { icon: MessageCircle, label: "Share your invite link with friends" },
  { icon: LinkIcon, label: "They sign up using your link" },
  { icon: Gift, label: "You both get 10,000 free credits" },
] as const;

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        "flex shrink-0 grow basis-0 flex-row items-center justify-center gap-2 rounded-[7px] px-3 py-1.5 text-sm font-medium leading-sm text-muted-foreground outline-0 transition-colors hover:cursor-pointer hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        active ? "bg-secondary text-accent-foreground" : "",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function InviteFriendsTab({
  copied,
  email,
  inviteLinkId,
  inviteLinkLabelId,
  emailInputId,
  emailLabelId,
  onCopy,
  onEmailChange,
}: {
  copied: boolean;
  email: string;
  inviteLinkId: string;
  inviteLinkLabelId: string;
  emailInputId: string;
  emailLabelId: string;
  onCopy: () => void;
  onEmailChange: (value: string) => void;
}) {
  const hasEmail = email.trim().length > 0;

  return (
    <div className="space-y-4">
      <div className="space-y-2 rounded-2xl bg-card p-6">
        <div className="text-sm font-medium text-muted-foreground">How it works:</div>
        <ul className="space-y-2">
          {howItWorksSteps.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-sm text-foreground">
              <Icon className="size-5 shrink-0 text-highlight" strokeWidth={1.5} />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <div className="flex w-full flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor={inviteLinkId}
              id={inviteLinkLabelId}
              className="select-none text-xs font-medium leading-xs text-muted-foreground"
            >
              Your invite link
            </label>
          </div>
          <div className="flex h-10 w-full items-center gap-2 rounded-[7px] border border-border bg-muted px-3 text-sm leading-sm transition-colors outline-0 hover:border-border/80 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring">
            <div className="flex shrink-0 items-center text-muted-foreground">
              <LinkIcon className="size-3.5" strokeWidth={1.5} />
            </div>
            <input
              id={inviteLinkId}
              readOnly
              value={billingData.inviteLink}
              aria-labelledby={inviteLinkLabelId}
              className="flex-1 bg-transparent text-foreground outline-none"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="gomer-focus-ring inline-flex min-h-10 w-full cursor-pointer select-none items-center justify-center gap-2 rounded-md border-0 bg-btn-primary px-4 py-2 text-sm font-medium text-btn-primary transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.98]"
        >
          {copied ? "Copied!" : "Copy referral link"}
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex w-full flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor={emailInputId}
              id={emailLabelId}
              className="select-none text-xs font-medium leading-xs text-muted-foreground"
            >
              Invite via email
            </label>
          </div>
          <div className="flex h-10 w-full items-center gap-2 rounded-[7px] border border-border bg-muted px-3 text-sm leading-sm transition-colors outline-0 hover:border-border/80 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring">
            <input
              id={emailInputId}
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              placeholder="e.g. alice@company.com, bob@startup.io"
              aria-labelledby={emailLabelId}
              className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground placeholder:opacity-50"
            />
          </div>
        </div>
        <button
          type="button"
          disabled={!hasEmail}
          className="gomer-focus-ring inline-flex min-h-10 w-full cursor-pointer select-none items-center justify-center gap-2 rounded-md border-0 bg-muted px-4 py-2 text-sm font-medium text-secondary-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-secondary/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="size-4" strokeWidth={1.5} />
          Invite via Email
        </button>
      </div>
    </div>
  );
}

function RewardsTab() {
  const { rewards } = billingData.referrals;

  if (rewards.length === 0) {
    return (
      <div className="rounded-2xl bg-card p-6 text-center">
        <Gift className="mx-auto mb-3 size-8 text-highlight" strokeWidth={1.5} />
        <p className="text-sm font-medium text-foreground">No rewards yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Invite friends to start earning credits.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-card p-6">
        <div className="text-sm font-medium text-muted-foreground">Total earned</div>
        <div className="mt-1 text-2xl font-semibold text-foreground">
          {billingData.referrals.totalEarned}
        </div>
      </div>
      <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
        {rewards.map((reward) => (
          <li key={reward.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-foreground">{reward.name}</div>
              <div className="text-xs text-muted-foreground">{reward.date}</div>
            </div>
            <span className="shrink-0 text-sm font-medium text-success-foreground">
              +{reward.credits}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GetFreeCreditsModal({ open, onClose }: GetFreeCreditsModalProps) {
  const [tab, setTab] = useState<Tab>("invite");
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const inviteLinkId = useId();
  const inviteLinkLabelId = useId();
  const emailInputId = useId();
  const emailLabelId = useId();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  async function copyReferralLink() {
    try {
      await navigator.clipboard.writeText(billingData.inviteLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (!open) return null;

  return createPortal(
    <div className="dashboard-shell fixed inset-0 z-50 grid place-items-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Get free credits"
        className="relative w-full max-w-lg rounded-md border border-border bg-popover p-6 font-body text-foreground outline-none"
      >
        <button
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          className="gomer-focus-ring absolute top-4 right-4 inline-flex size-10 min-h-10 cursor-pointer select-none items-center justify-center rounded-[7px] border-0 bg-transparent text-muted-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-accent active:scale-[0.98]"
        >
          <X className="size-4" strokeWidth={1.5} />
        </button>

        <div className="flex max-h-[85vh] w-full flex-col gap-4">
          <div className="space-y-2">
            <div className="text-lg font-medium leading-lg tracking-lg text-foreground">
              Refer and earn credits
            </div>
            <div className="text-sm font-medium text-secondary">
              Get 10,000 credits for every friend that adds Gomer to their own Slack workspace.
            </div>
          </div>

          <div
            role="group"
            aria-label="Referral sections"
            className="flex flex-row items-stretch justify-center gap-1 rounded-[6px] border border-border bg-background p-1"
          >
            <TabButton active={tab === "invite"} onClick={() => setTab("invite")}>
              Invite friends
            </TabButton>
            <TabButton active={tab === "rewards"} onClick={() => setTab("rewards")}>
              Rewards
            </TabButton>
          </div>

          {tab === "invite" ? (
            <InviteFriendsTab
              copied={copied}
              email={email}
              inviteLinkId={inviteLinkId}
              inviteLinkLabelId={inviteLinkLabelId}
              emailInputId={emailInputId}
              emailLabelId={emailLabelId}
              onCopy={copyReferralLink}
              onEmailChange={setEmail}
            />
          ) : (
            <RewardsTab />
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
