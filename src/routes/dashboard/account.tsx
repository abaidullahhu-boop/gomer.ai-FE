import { useState } from "react";
import { Copy, X } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { accountData } from "@/data/account";

function SlackIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 127 127"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z"
        fill="#E01E5A"
      />
      <path
        d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9c0-7.3 5.9-13.2 13.2-13.2H47z"
        fill="#36C5F0"
      />
      <path
        d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.8C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33.1z"
        fill="#2EB67D"
      />
      <path
        d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z"
        fill="#ECB22E"
      />
    </svg>
  );
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="viktor-focus-ring inline-flex min-h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] border-0 bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-secondary/80 active:scale-[0.98]"
    >
      {children}
    </button>
  );
}

function EmailPill({ email, onRemove }: { email: string; onRemove: () => void }) {
  return (
    <div className="inline-flex h-7 items-center gap-2 rounded-full border border-border bg-secondary px-2 text-xs font-medium text-secondary-foreground">
      {email}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${email}`}
        className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-[rgba(255,255,255,0.12)] transition-colors hover:bg-[rgba(255,255,255,0.24)]"
      >
        <X className="size-2.5 cursor-pointer" strokeWidth={1.5} />
      </button>
    </div>
  );
}

export default function DashboardAccount() {
  const [copied, setCopied] = useState(false);
  const [domainInput, setDomainInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [allowedDomains, setAllowedDomains] = useState<string[]>([
    ...accountData.email.allowedDomains,
  ]);
  const [allowedEmails, setAllowedEmails] = useState<string[]>([
    ...accountData.email.allowedEmails,
  ]);

  async function copyEmailAddress() {
    try {
      await navigator.clipboard.writeText(accountData.email.viktorAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function addDomain() {
    const domain = domainInput.trim();
    if (!domain || allowedDomains.includes(domain)) return;
    setAllowedDomains((domains) => [...domains, domain]);
    setDomainInput("");
  }

  function addEmail() {
    const email = emailInput.trim();
    if (!email || allowedEmails.includes(email)) return;
    setAllowedEmails((emails) => [...emails, email]);
    setEmailInput("");
  }

  return (
    <>
      <PageMeta
        title="Account — Viktor"
        description="Manage your Slack connection, email settings, and account."
      />
      <div className="flex h-full min-h-0 flex-1 flex-col font-sans text-foreground">
        <div
            className="flex-1 overflow-y-auto px-4 sm:px-12 py-8 "
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="mx-auto w-full max-w-[1000px]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <h1 className="text-3xl font-bold leading-8 text-foreground">Account</h1>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-md border border-border bg-card">
                <div className="flex flex-col gap-2 p-5">
                  <h2 className="font-body text-base font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      <SlackIcon className="size-4 shrink-0" />
                      Slack Connection
                    </div>
                  </h2>
                  <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Viktor is connected to {accountData.slack.workspaceName}. If you disconnect,
                    Viktor will immediately stop accessing your Slack data. You can reconnect
                    anytime.
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <img
                      alt={`${accountData.slack.workspaceName} logo`}
                      className="size-6 rounded-[6px] border border-white/10 object-cover"
                      src={accountData.slack.avatar}
                    />
                    <span className="text-sm font-medium text-foreground">
                      {accountData.slack.workspaceName}
                    </span>
                  </div>
                </div>
                <div className="flex w-full items-center justify-start border-t border-border bg-muted/30 p-4">
                  <div className="flex flex-wrap gap-2">
                    <SecondaryButton>Disconnect</SecondaryButton>
                    <SecondaryButton>Disconnect + Uninstall</SecondaryButton>
                    <SecondaryButton>Reconnect</SecondaryButton>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-md border border-border bg-card">
                <div className="flex flex-col gap-2 p-5">
                  <h2 className="font-body text-base font-medium text-foreground">Email Settings</h2>
                  <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Only emails from the domains and addresses listed below can reach Viktor. Emails
                    from other senders will be rejected.
                  </p>

                  <div className="mt-4 flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-medium">Viktor&apos;s Email Address</h4>
                      <p className="text-xs text-muted-foreground">
                        Send emails to this address to have Viktor process them
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm text-foreground">
                          {accountData.email.viktorAddress}
                        </span>
                        <button
                          type="button"
                          onClick={copyEmailAddress}
                          aria-label={copied ? "Copied" : "Copy email address"}
                          className="viktor-focus-ring inline-flex min-h-8 cursor-pointer select-none items-center justify-center gap-2 rounded-md border-0 bg-transparent px-3 py-2 text-xs font-medium text-muted-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-accent active:scale-[0.98]"
                        >
                          <Copy className="size-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1">
                        <h4 className="text-sm font-medium">Allowed Domains</h4>
                        <p className="text-xs text-muted-foreground">
                          Any email from these domains will be accepted (e.g., company.com)
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex w-full flex-1 flex-col gap-1.5">
                          <div className="viktor-focus-ring flex h-10 w-full items-center gap-2 rounded-[7px] border border-border bg-muted px-3 text-sm transition-colors hover:border-border/80 focus-within:outline-2">
                            <input
                              placeholder="example.com"
                              value={domainInput}
                              onChange={(event) => setDomainInput(event.target.value)}
                              onKeyDown={(event) => {
                                if (event.key === "Enter" && domainInput.trim()) addDomain();
                              }}
                              className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground placeholder:opacity-50"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          disabled={!domainInput.trim()}
                          onClick={addDomain}
                          className="viktor-focus-ring inline-flex min-h-10 shrink-0 cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] border-0 bg-muted px-4 py-2 text-sm font-medium text-secondary-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-secondary/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Add Domain
                        </button>
                      </div>
                      {allowedDomains.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {allowedDomains.map((domain) => (
                            <EmailPill
                              key={domain}
                              email={domain}
                              onRemove={() =>
                                setAllowedDomains((domains) =>
                                  domains.filter((item) => item !== domain),
                                )
                              }
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1">
                        <h4 className="text-sm font-medium">Allowed Email Addresses</h4>
                        <p className="text-xs text-muted-foreground">
                          Specific email addresses that can email Viktor
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="flex w-full flex-1 flex-col gap-1.5">
                          <div className="viktor-focus-ring flex h-10 w-full items-center gap-2 rounded-[7px] border border-border bg-muted px-3 text-sm transition-colors hover:border-border/80 focus-within:outline-2">
                            <input
                              placeholder="user@example.com"
                              value={emailInput}
                              onChange={(event) => setEmailInput(event.target.value)}
                              onKeyDown={(event) => {
                                if (event.key === "Enter" && emailInput.trim()) addEmail();
                              }}
                              className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground placeholder:opacity-50"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          disabled={!emailInput.trim()}
                          onClick={addEmail}
                          className="viktor-focus-ring inline-flex min-h-10 shrink-0 cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] border-0 bg-muted px-4 py-2 text-sm font-medium text-secondary-foreground transition-[background-color,border-color,transform] duration-200 hover:bg-secondary/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Add Email
                        </button>
                      </div>
                      {allowedEmails.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {allowedEmails.map((email) => (
                            <EmailPill
                              key={email}
                              email={email}
                              onRemove={() =>
                                setAllowedEmails((emails) =>
                                  emails.filter((item) => item !== email),
                                )
                              }
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="overflow-hidden rounded-md bg-card"
                style={{ border: "1px solid rgba(220, 38, 38, 0.3)" }}
              >
                <div className="flex flex-col gap-2 p-5">
                  <h2 className="font-body text-base text-foreground">Delete Account</h2>
                  <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Permanently remove your account, all team members, and all workspace contents.
                    Your subscription will also be canceled. This action is not reversible, so
                    please continue with caution.
                  </p>
                </div>
                <div
                  className="flex w-full items-center justify-start p-4"
                  style={{
                    borderTop: "1px solid rgba(220, 38, 38, 0.2)",
                    backgroundColor: "rgba(220, 38, 38, 0.05)",
                  }}
                >
                  <button
                    type="button"
                    className="viktor-focus-ring inline-flex min-h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-[7px] border-0 bg-destructive/90 px-4 py-2 text-sm font-medium text-white transition-[background-color,border-color,transform] duration-200 hover:bg-destructive/90 active:scale-[0.98]"
                  >
                    Cancel Subscription &amp; Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
