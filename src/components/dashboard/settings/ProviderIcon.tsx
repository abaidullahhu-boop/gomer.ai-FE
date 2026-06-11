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

function OpenAIIcon() {
  return (
    <span
      role="img"
      aria-label="openai"
      className="block size-4 shrink-0 scale-150 bg-foreground"
      style={{
        maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='black' d='M8 1.2a4.5 4.5 0 0 0-4.2 6 4.5 4.5 0 0 0 1.8 6 4.5 4.5 0 0 0 5.6-1.2A4.5 4.5 0 0 0 8 1.2zm0 1.5a3 3 0 0 1 2.8 4.1L6.5 11.5a3 3 0 0 1-1.2-4 3 3 0 0 1 2.7-4.8z'/%3E%3C/svg%3E")`,
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "contain",
        WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='black' d='M8 1.2a4.5 4.5 0 0 0-4.2 6 4.5 4.5 0 0 0 1.8 6 4.5 4.5 0 0 0 5.6-1.2A4.5 4.5 0 0 0 8 1.2zm0 1.5a3 3 0 0 1 2.8 4.1L6.5 11.5a3 3 0 0 1-1.2-4 3 3 0 0 1 2.7-4.8z'/%3E%3C/svg%3E")`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        WebkitMaskSize: "contain",
      }}
    />
  );
}

function GoogleIcon() {
  return (
    <svg
      aria-label="google"
      className="block size-4 shrink-0 object-contain"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8 6.5v3.2h4.5c-.2 1-1 2.4-2.3 3.1L12.5 14c2.1-1.9 3.3-4.7 3.3-8 0-.8-.1-1.5-.2-2.2H8z"
        fill="#4285F4"
      />
      <path
        d="M3.6 9.6l-.9.7-2.5 1.9C1.8 14.2 4.6 16 8 16c2.4 0 4.4-.8 5.9-2.1l-3.1-2.4c-.9.6-2 1-2.8 1-2.1 0-3.9-1.4-4.6-3.4z"
        fill="#34A853"
      />
      <path
        d="M1.1 4.8C.4 6.2 0 7.6 0 9.2s.4 3 1.1 4.4C2.2 11.6 5 9.2 5 9.2S2.2 6.8 1.1 4.8z"
        fill="#FBBC05"
      />
      <path
        d="M8 3.2c1.3 0 2.5.4 3.4 1.3l2.6-2.6C12.4.9 10.4 0 8 0 4.6 0 1.8 1.8.3 4.4l2.5 1.9C3.5 4.6 5.3 3.2 8 3.2z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function ProviderIcon({ provider }: { provider: ModelProvider }) {
  switch (provider) {
    case "anthropic":
      return <AnthropicIcon />;
    case "openai":
      return <OpenAIIcon />;
    case "google":
      return <GoogleIcon />;
    case "other":
      return <span aria-hidden="true" className="inline-block size-4 shrink-0" />;
    default:
      return null;
  }
}
