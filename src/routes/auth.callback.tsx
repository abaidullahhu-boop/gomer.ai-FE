import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { storeTokens } from "@/lib/auth";

/**
 * Landing route for the Slack OAuth redirect. The backend sends the browser
 * here as `/auth/callback?accessToken=...&refreshToken=...` after a successful
 * sign-in. We persist the tokens and move the user along.
 */
export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const slackError = searchParams.get("error");
    if (slackError) {
      setError(slackError);
      return;
    }

    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (!accessToken || !refreshToken) {
      setError("Missing authentication tokens. Please try signing in again.");
      return;
    }

    storeTokens(accessToken, refreshToken);
    // Replace so the tokens don't linger in history; land in the dashboard.
    navigate("/dashboard", { replace: true });
  }, [navigate, searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4">
      <PageMeta title="Signing you in…" description="Completing sign-in to Gomer." />
      {error ? (
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-xl font-semibold text-foreground">Sign-in failed</h1>
          <p className="max-w-[360px] text-sm text-muted-foreground">{error}</p>
          <a href="/sign-in" className="text-sm font-medium text-foreground underline">
            Back to sign in
          </a>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Signing you in…</p>
      )}
    </div>
  );
}
