import type { ModelProvider } from "@/data/models";

function AnthropicIcon() {
  return (
    <span
      role="img"
      aria-label="anthropic"
      className="block size-4 shrink-0 rounded-sm bg-foreground"
      style={{
        maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='black' d='M8 1.5L1 14.5h3.2l.9-2h5.8l.9 2H15L8 1.5zm0 4.2l2.1 4.8H5.9L8 5.7z'/%3E%3C/svg%3E")`,
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "contain",
        WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='black' d='M8 1.5L1 14.5h3.2l.9-2h5.8l.9 2H15L8 1.5zm0 4.2l2.1 4.8H5.9L8 5.7z'/%3E%3C/svg%3E")`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        WebkitMaskSize: "contain",
      }}
    />
  );
}

/**
 * Models reached through the gateway can come from any vendor, and the backend
 * catalog does not track which — so they get a neutral mark rather than a
 * guessed logo.
 */
function GatewayIcon() {
  return (
    <span
      role="img"
      aria-label="via gateway"
      className="block size-4 shrink-0 rounded-sm border border-muted-foreground/40"
    />
  );
}

export function ProviderIcon({ provider }: { provider: ModelProvider }) {
  switch (provider) {
    case "anthropic":
      return <AnthropicIcon />;
    case "gateway":
      return <GatewayIcon />;
    default:
      return null;
  }
}
