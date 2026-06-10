import type { ReactNode } from "react";

export function ConicPriceCardShell({
  children,
  className = "",
  contentClassName = "",
}: {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <div
      className={`group/card relative flex w-full flex-col overflow-visible rounded-section border-0 bg-transparent p-0 ring-0 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[18px]">
        <div className="bg-conic-gradient-bg absolute inset-0 opacity-75" />
        <div
          className="absolute inset-[8px] rounded-[inherit]"
          style={{ background: "#fff", filter: "blur(32px)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background:
              "radial-gradient(ellipse 85% 75% at 50% 35%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.45) 45%, rgba(255,255,255,0) 72%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background:
              "radial-gradient(ellipse 110% 105% at 50% 38%, transparent 52%, rgba(150,120,210,0.18) 78%, rgba(90,60,170,0.32) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background:
              "linear-gradient(-56deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.08) 100%)",
            mask: "linear-gradient(#fff,#fff) content-box exclude, linear-gradient(#fff,#fff)",
            WebkitMask:
              "linear-gradient(#fff,#fff) content-box exclude, linear-gradient(#fff,#fff)",
            padding: "1px",
          }}
        />
      </div>

      <div className={`relative z-[2] ${contentClassName}`}>{children}</div>
    </div>
  );
}
