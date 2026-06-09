import { useCallback, useId, useLayoutEffect, useRef, useState } from "react";
import chatgptIcon from "@/assets/images/chatgpt.svg";
import claudeIcon from "@/assets/images/claude.svg";
import copilotIcon from "@/assets/images/copilot.svg";
import viktorBrandDark from "@/assets/images/viktor-brand-dark.svg";
import zapierIcon from "@/assets/images/zapier.svg";

type TabIconProps = { className?: string };

function AdSpendIcon({ className }: TabIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 19.2857 19.2858" fill="none" className={className ?? "text-secondary"} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.14286 9.14757C2.14286 6.76043 2.81093 5.04676 3.92884 3.92884C5.04676 2.81093 6.76043 2.14286 9.14757 2.14286C11.5347 2.14286 13.2484 2.81093 14.3663 3.92884C15.4843 5.04676 16.1523 6.76043 16.1523 9.14757C16.1523 11.5347 15.4843 13.2484 14.3663 14.3663C13.2484 15.4843 11.5347 16.1523 9.14757 16.1523C6.76043 16.1523 5.04676 15.4843 3.92884 14.3663C2.81093 13.2484 2.14286 11.5347 2.14286 9.14757ZM9.14757 0C6.36599 0 4.04159 0.785636 2.41361 2.41361C0.785636 4.04159 0 6.36599 0 9.14757C0 11.9292 0.785636 14.2536 2.41361 15.8816C4.04159 17.5096 6.36599 18.2951 9.14757 18.2951C11.3479 18.2951 13.2621 17.8036 14.7719 16.7923L16.847 18.8673C17.4049 19.4253 18.3094 19.4253 18.8673 18.8673C19.4251 18.3094 19.4251 17.4049 18.8673 16.847L16.7921 14.772C17.8036 13.2623 18.2951 11.348 18.2951 9.14757C18.2951 6.36599 17.5096 4.04159 15.8816 2.41361C14.2536 0.785636 11.9292 0 9.14757 0ZM8.47581 4.64297C8.58229 4.52203 8.80586 4.3246 9.14759 4.3246C9.48931 4.3246 9.71289 4.52203 9.81936 4.64297C9.92783 4.7662 10.0033 4.90757 10.0546 5.01481C10.1372 5.18749 10.2209 5.41277 10.2987 5.62224C10.3169 5.67119 10.3348 5.7195 10.3523 5.76584C10.5612 6.32086 10.7897 6.8429 11.1267 7.17989C11.4576 7.51079 11.9669 7.72081 12.5244 7.9207L12.6287 7.95787C12.8499 8.03646 13.0979 8.12456 13.2894 8.21891C13.4023 8.27453 13.5504 8.35761 13.6779 8.48127C13.8137 8.61293 13.9706 8.83671 13.9706 9.14764C13.9706 9.45857 13.8137 9.68236 13.6779 9.81401C13.5504 9.93767 13.4023 10.0208 13.2894 10.0764C13.0979 10.1707 12.8499 10.2588 12.6287 10.3374L12.5244 10.3746C11.9669 10.5745 11.4576 10.7845 11.1267 11.1154C10.7897 11.4524 10.5612 11.9744 10.3523 12.5294C10.3348 12.5758 10.3169 12.624 10.2987 12.673C10.2209 12.8825 10.1372 13.1078 10.0546 13.2805C10.0033 13.3877 9.92783 13.5291 9.81936 13.6523C9.71289 13.7733 9.48931 13.9707 9.14759 13.9707C8.80586 13.9707 8.58229 13.7733 8.47581 13.6523C8.36734 13.5291 8.29191 13.3877 8.24059 13.2805C8.15793 13.1078 8.07424 12.8825 7.99644 12.673C7.97824 12.624 7.96037 12.5758 7.9429 12.5294C7.73393 11.9744 7.50546 11.4524 7.16847 11.1154C6.83757 10.7845 6.32826 10.5745 5.77074 10.3746L5.66646 10.3374C5.44527 10.2588 5.19729 10.1707 5.00576 10.0764C4.89286 10.0208 4.7448 9.93767 4.61724 9.81401C4.48144 9.68236 4.3246 9.45857 4.3246 9.14764C4.3246 8.83671 4.48144 8.61293 4.61724 8.48127C4.7448 8.35761 4.89286 8.27453 5.00576 8.21891C5.19729 8.12456 5.44526 8.03646 5.66644 7.95787L5.77074 7.9207C6.32826 7.72081 6.83757 7.51079 7.16847 7.17989C7.50546 6.8429 7.73393 6.32086 7.9429 5.76584C7.96036 5.71946 7.97823 5.67134 7.99643 5.62236C8.07423 5.41287 8.15793 5.1875 8.24059 5.01481C8.29191 4.90757 8.36734 4.7662 8.47581 4.64297Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MeetingsIcon({ className }: TabIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className ?? "text-secondary"} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.57143 0C6.61434 0 5.03226 0.0639687 3.3952 0.185963C1.6619 0.315129 0.296981 1.70626 0.193279 3.4387C0.0666367 5.55437 0 7.74947 0 10C0 12.2505 0.0666367 14.4456 0.19328 16.5613C0.296981 18.2937 1.6619 19.6849 3.3952 19.814C4.75223 19.9151 6.07149 19.9764 7.59787 19.9944C7.28077 19.3543 7.17589 18.6001 7.38221 17.8313L8.18889 14.8249C8.30029 14.4097 8.51687 14.0303 8.8177 13.7232L13.7206 8.71876C14.6819 7.73767 15.8957 7.34749 17.0807 7.40571C16.9637 6.45317 16.6247 5.53084 16.06 4.73203C14.9496 3.16146 13.9567 2.06794 12.4483 0.804141C11.8542 0.306386 11.1093 0.0368269 10.3455 0.0193746C9.78269 0.00651351 9.19597 0 8.57143 0ZM8.2105 4.31187C8.59219 3.99964 8.64849 3.43713 8.33626 3.05546C8.02404 2.67377 7.46153 2.61747 7.07986 2.9297C6.46263 3.4346 5.977 3.9061 5.56219 4.48996C5.368 4.76327 5.19546 5.0526 5.03356 5.36947L4.63993 5.00341C4.27883 4.6676 3.71387 4.68811 3.37807 5.04921C3.04226 5.41031 3.06277 5.97527 3.42387 6.31107L4.73779 7.53296C4.95477 7.73473 5.25771 7.81573 5.54644 7.74914C5.83516 7.68257 6.07206 7.47709 6.17876 7.20067C6.47474 6.43394 6.72659 5.93424 7.0179 5.52421C7.30664 5.11779 7.66157 4.76091 8.2105 4.31187ZM8.33626 9.07997C8.64849 9.46164 8.59219 10.0242 8.2105 10.3364C7.66157 10.7854 7.30664 11.1423 7.0179 11.5487C6.72659 11.9588 6.47474 12.4585 6.17876 13.2252C6.07206 13.5016 5.83516 13.7071 5.54644 13.7737C5.25771 13.8402 4.95477 13.7592 4.73779 13.5575L3.42387 12.3356C3.06277 11.9998 3.04226 11.4348 3.37807 11.0737C3.71387 10.7126 4.27883 10.6921 4.63993 11.0279L5.03356 11.394C5.19546 11.0771 5.368 10.7878 5.56219 10.5145C5.977 9.93061 6.46263 9.45912 7.07986 8.95422C7.46153 8.64199 8.02404 8.6983 8.33626 9.07997ZM14.9967 9.96789C16.1107 8.83083 17.9313 8.9893 19.0544 10.0933C20.2031 11.2226 20.373 13.097 19.1877 14.2192L14.1446 18.9941C14.0566 19.0774 13.9489 19.137 13.8315 19.1673L10.7569 19.9587C10.2427 20.091 9.76561 19.8894 9.46646 19.5877C9.16731 19.2859 8.96969 18.8069 9.10743 18.2934L9.9141 15.2871C9.94593 15.1684 10.0078 15.0601 10.0938 14.9723L14.9967 9.96789Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WorkflowIcon({ className }: TabIconProps) {
  return (
    <svg viewBox="0 0 19.9999 20.0005" fill="none" className={className ?? "text-secondary"} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5005 1.53257C10.5328 1.01678 10.3026 0.54739 9.92251 0.266309C9.53403 -0.0209902 8.99356 -0.102854 8.49653 0.155519C5.11667 1.91253 2.22896 5.62103 0.25938 9.30481C-0.516561 10.7561 0.5462 12.4672 2.15054 12.4672H4.4354C4.04957 14.3944 3.8425 16.4437 3.72243 18.455C3.65146 19.6437 5.00521 20.498 6.02104 19.6727C7.10014 18.7961 8.08219 17.9003 8.9708 17.0083C8.41873 16.5803 7.85714 15.8743 7.85714 14.8214C7.85714 13.3726 8.92066 12.5805 9.55936 12.2659C9.8881 12.1039 10.2433 11.98 10.4706 11.9006L10.5722 11.865C10.8603 11.7616 11.0703 11.6785 11.2346 11.5966C11.313 11.5574 11.3676 11.525 11.4047 11.5001C11.6601 11.328 11.7637 10.9898 11.8579 10.6821C11.8855 10.5919 11.9123 10.5044 11.9419 10.4244C12.0246 10.2009 12.1527 9.85456 12.2809 9.58674C12.5586 9.00663 13.3189 7.85714 14.8214 7.85714C14.9049 7.85714 14.9859 7.86069 15.0649 7.86749C14.9453 7.09371 14.3736 6.4208 13.5 6.2641C12.4853 6.0821 11.3384 5.97341 10.2257 5.91207L10.5005 1.53257ZM14.1379 9.9678C14.2481 9.84261 14.4756 9.64286 14.8214 9.64286C15.1673 9.64286 15.3947 9.84261 15.5049 9.9678C15.6171 10.0953 15.6961 10.2428 15.7511 10.3577C15.8396 10.5425 15.9291 10.7836 16.0137 11.0112C16.0336 11.0647 16.0533 11.1177 16.0724 11.1688C16.2993 11.7711 16.5513 12.3504 16.928 12.7271C17.2987 13.0977 17.865 13.3297 18.4696 13.5465L18.5836 13.5872C18.8244 13.6727 19.0897 13.767 19.2943 13.8678C19.4147 13.9271 19.569 14.014 19.7007 14.1418C19.8407 14.2775 19.9999 14.5057 19.9999 14.8214C19.9999 15.1371 19.8407 15.3653 19.7007 15.5011C19.569 15.6289 19.4147 15.7157 19.2943 15.7751C19.0897 15.8759 18.8244 15.9701 18.5837 16.0557L18.4696 16.0964C17.865 16.3131 17.2987 16.5451 16.928 16.9157C16.5513 17.2924 16.2993 17.8717 16.0724 18.4741C16.0533 18.5251 16.0336 18.578 16.0137 18.6314C15.9291 18.859 15.8396 19.1004 15.7511 19.2851C15.6961 19.4 15.6171 19.5476 15.5049 19.675C15.3947 19.8003 15.1673 20 14.8214 20C14.4756 20 14.2481 19.8003 14.1379 19.675C14.0257 19.5476 13.9466 19.4 13.8916 19.2851C13.8032 19.1004 13.7136 18.8591 13.6291 18.6317C13.6092 18.5781 13.5895 18.5253 13.5703 18.4741C13.3435 17.8717 13.0914 17.2924 12.7147 16.9157C12.3441 16.5451 11.7778 16.3131 11.1732 16.0964L11.0591 16.0557C10.8183 15.9701 10.553 15.8759 10.3485 15.7751C10.228 15.7157 10.0738 15.6289 9.94204 15.5011C9.80201 15.3653 9.64286 15.1371 9.64286 14.8214C9.64286 14.5057 9.80201 14.2775 9.94204 14.1418C10.0738 14.014 10.228 13.9271 10.3485 13.8678C10.553 13.767 10.8183 13.6727 11.0591 13.5872L11.1732 13.5465C11.7778 13.3297 12.3441 13.0977 12.7147 12.7271C13.0914 12.3504 13.3435 11.7711 13.5703 11.1688C13.5895 11.1176 13.6092 11.0648 13.6291 11.0112C13.7136 10.7837 13.8032 10.5425 13.8916 10.3577C13.9466 10.2428 14.0257 10.0953 14.1379 9.9678Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ToolsIcon({ className }: TabIconProps) {
  return (
    <svg viewBox="0 0 19.9999 20.0001" fill="none" className={className ?? "text-secondary"} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.93197 2.13797C7.17326 0.896716 8.90691 -0.123237 10.5084 0.0120822C11.4639 0.0928148 12.3965 0.49168 13.1648 1.126L13.1675 1.12824C15.2531 2.86679 17.1333 4.74641 18.8717 6.8323L18.874 6.83496C19.5083 7.60329 19.9071 8.53581 19.9879 9.49129C20.1231 11.0921 19.103 12.8259 17.8619 14.0674C16.6209 15.3089 14.8874 16.3297 13.2863 16.1944C12.3308 16.1137 11.3983 15.7149 10.6299 15.0804L10.6272 15.0781C8.5413 13.3392 6.66116 11.4595 4.92222 9.37339L4.91997 9.37067C4.28563 8.60236 3.88676 7.66981 3.80603 6.71434C3.6707 5.11284 4.69069 3.37924 5.93197 2.13797ZM0.841132 14.8374C1.967 13.6871 3.15227 12.6214 4.41241 11.626C5.6557 13.0304 6.97001 14.3446 8.37424 15.5877C7.37881 16.8479 6.31311 18.0331 5.16269 19.159C3.95676 20.3391 2.06433 20.2421 0.911139 19.0889C-0.242047 17.9357 -0.339058 16.0434 0.841132 14.8374Z"
        fill="currentColor"
      />
    </svg>
  );
}

const TABS = [
  {
    id: "ad",
    label: "Ad Spend Audit",
    icon: AdSpendIcon,
    left: { name: "ChatGPT", icon: chatgptIcon, text: "Tells you how to audit your ad spend." },
    right: { highlight: "Audits it.", text: "Hands you the PDF." },
  },
  {
    id: "meetings",
    label: "Meeting follow-ups",
    icon: MeetingsIcon,
    left: { name: "Copilot", icon: copilotIcon, text: "Summarizes your meetings." },
    right: { highlight: "Creates the tasks,", text: "sends follow-ups." },
  },
  {
    id: "workflow",
    label: "Workflow Automation",
    icon: WorkflowIcon,
    left: { name: "Zapier", icon: zapierIcon, text: "Follows the rules you write." },
    right: { highlight: "Figures out,", text: "what needs automating and does it." },
  },
  {
    id: "tools",
    label: "Building Tools",
    icon: ToolsIcon,
    left: { name: "Claude Code", icon: claudeIcon, text: "Writes the code. You figure out the rest." },
    right: { highlight: "Builds it,", text: "ships it, sends you the link." },
  },
];

type TabIndicator = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export function CompareSection() {
  const [active, setActive] = useState(TABS[0].id);
  const current = TABS.find((t) => t.id === active)!;
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());
  const [indicator, setIndicator] = useState<TabIndicator | null>(null);

  const updateIndicator = useCallback(() => {
    const container = tabsRef.current;
    const button = tabRefs.current.get(active);
    if (!container || !button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    setIndicator({
      left: buttonRect.left - containerRect.left,
      top: buttonRect.top - containerRect.top,
      width: buttonRect.width,
      height: buttonRect.height,
    });
  }, [active]);

  useLayoutEffect(() => {
    updateIndicator();

    const container = tabsRef.current;
    if (!container) return;

    const observer = new ResizeObserver(updateIndicator);
    observer.observe(container);
    window.addEventListener("resize", updateIndicator);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  return (
    <section className="px-6 py-24 bg-section-cream">
      <div className="d-flex flex-col items-center justify-center mx-auto max-w-6xl text-center">
        <p className="text-sm tracking-full text-primitive-purple-700">
          Viktor vs AI tools
        </p>
        <h2 className="typo-h2 mt-5 text-foreground leading-[1.02]">
          You've tried the AI tools.
          <br />
          The work is still there.
        </h2>
        <p className="mt-6 text-foreground/50 max-w-xl mx-auto text-base">
          ChatGPT. Claude. Zapier. Notion AI. You're already using AI. You're also still
          doing the work.
        </p>

        {/* Tabs — same horizontal bounds as comparison cards below */}
        <div className="mt-20 w-full sm:px-8 lg:px-0">
          <div
            ref={tabsRef}
            className="relative w-full py-1 px-1 flex flex-nowrap items-center justify-between gap-2 overflow-x-auto rounded-full bg-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {indicator && (
              <div
                aria-hidden="true"
                className="absolute rounded-full bg-hero pointer-events-none transition-[left,top,width,height] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  left: indicator.left,
                  top: indicator.top,
                  width: indicator.width,
                  height: indicator.height,
                }}
              />
            )}
            {TABS.map((t) => {
              const Icon = t.icon;
              const isActive = t.id === active;
              return (
                <button
                  key={t.id}
                  ref={(node) => {
                    if (node) tabRefs.current.set(t.id, node);
                    else tabRefs.current.delete(t.id);
                  }}
                  onClick={() => setActive(t.id)}
                  className={
                    "relative z-10 inline-flex w-fit flex-none items-center gap-5 whitespace-nowrap px-4 sm:px-12 py-3 rounded-full text-md font-medium transition-colors duration-300 ease-out " +
                    (isActive ? "text-white" : "text-primary hover:text-foreground")
                  }
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-colors duration-300 ease-out ${
                      isActive ? "text-[#D0CFD6]" : "text-[#D0CFD6]"
                    }`}
                  />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison cards with connector */}
        <div className="mt-14 w-full sm:px-8 lg:px-0">
          <div className="flex flex-col md:flex-row md:items-stretch gap-6 md:gap-0">
            <div
              className="text-left p-7 rounded-3xl min-h-[135px] flex flex-col justify-between md:flex-1 ring-1 ring-white/50 "
              style={{
                background:
                  "radial-gradient(482.96% 141.42% at .12% 0, #f2598a1a 0%, #f2598a00 100%), #fffc",
              }}
            >
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                  <img src={current.left.icon} alt="" className="w-6 h-6 object-contain" aria-hidden="true" />
                </span>
                <span className="text-md font-medium text-primary">{current.left.name}</span>
              </div>
              <p className="text-foreground/70 text-[15px] mt-10">{current.left.text}</p>
            </div>

            <ComparisonConnector />

            <div className="relative bg-hero text-left px-5 pb-8 pt-4 rounded-xl text-white min-h-[135px] flex flex-col justify-between gap-4 md:justify-end md:gap-0 md:pt-0 md:pl-5 md:pr-0 shadow-[0_20px_60px_-20px_rgba(60,40,180,0.5)] md:flex-1">
              <div className="relative z-10 inline-flex h-auto w-fit shrink-0 rounded-[40px] px-4 py-3 shadow-lg backdrop-blur-[5px] backdrop-saturate-150 md:absolute md:-left-4 md:-top-5 md:px-10 md:py-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
                  style={{
                    background:
                      "radial-gradient(ellipse 130% 100% at 50% 0%, rgba(254,177,142,0.4) 0%, rgba(255,201,173,0.4) 24%, rgba(211,196,252,0.4) 100%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
                  style={{
                    background:
                      "linear-gradient(-56deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.6) 100%)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    padding: "1px",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[inherit]"
                  style={{ filter: "blur(5px)", WebkitFilter: "blur(5px)" }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[inherit]"
                    style={{
                      background:
                        "linear-gradient(-56deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,1) 100%)",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      padding: "4px",
                    }}
                  />
                </div>
                <div className="relative z-[2] flex h-full w-full items-center">
                  <img
                    src={viktorBrandDark}
                    alt="Viktor"
                    width={108}
                    height={32}
                    className="h-6 w-auto md:h-8"
                  />
                </div>
              </div>
              <p className="text-lg font-medium">
                <span className="text-primitive-purple-700 inline-block px-2 py-0.5 rounded-[5px] bg-[#f1edff] mr-1.5 text-lg font-medium">
                  {current.right.highlight}
                </span>
                {current.right.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const CONNECTOR_BLUR_LAYERS = [
  { mask: "linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,1) 100%)", blur: 7 },
  { mask: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 10%)", blur: 15 },
  { mask: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 20%)", blur: 14.111 },
  { mask: "linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 30%)", blur: 13.222 },
  { mask: "linear-gradient(to left, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 40%)", blur: 12.333 },
  { mask: "linear-gradient(to left, rgba(0,0,0,0) 20%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 50%)", blur: 11.444 },
  { mask: "linear-gradient(to left, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 60%)", blur: 10.556 },
  { mask: "linear-gradient(to left, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 70%)", blur: 9.667 },
  { mask: "linear-gradient(to left, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 80%)", blur: 8.778 },
  { mask: "linear-gradient(to left, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 70%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 90%)", blur: 7.889 },
  { mask: "linear-gradient(to left, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 80%, rgba(0,0,0,1) 100%)", blur: 7 },
];

function ComparisonConnector() {
  const id = useId().replace(/:/g, "");
  const svgClass =
    "pointer-events-none absolute top-1/2 left-0 h-[156px] max-w-none -translate-y-1/2";

  return (
    <div
      className="relative hidden w-56 shrink-0 overflow-visible md:block"
      style={{ minHeight: 160 }}
      aria-hidden="true"
    >
      <span className="pointer-events-none absolute inset-0 isolate overflow-visible">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 398 156"
          fill="none"
          preserveAspectRatio="none"
          className={`${svgClass} z-0`}
          aria-hidden="true"
          style={{ width: "calc(165.937%)" }}
        >
          <ellipse
            opacity="0.4"
            cx="295.35"
            cy="78"
            rx="74"
            ry="56"
            fill={`url(#${id}-ellipse)`}
          />
          <defs>
            <linearGradient
              id={`${id}-ellipse`}
              x1="193.111"
              y1="-0.464966"
              x2="420.401"
              y2="45.6327"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFBB98" />
              <stop offset="1" stopColor="#BCAAFF" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 398 156"
          fill="none"
          preserveAspectRatio="none"
          className={`${svgClass} z-1`}
          aria-hidden="true"
          style={{ width: "calc(165.937%)" }}
        >
          <path
            d="M1.84955 84.904C69.03020329528515 33.02164703432037 160.10494529038746 171.1672764730036 239.85 84.904"
            stroke={`url(#${id}-orange)`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.84955 56.9097C77.88292972935434 142.286718710162 182.95103717355641 -6.8595259858710165 239.85 56.9097"
            stroke={`url(#${id}-purple)`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id={`${id}-orange`}
              x1="1.84955"
              y1="76"
              x2="239.85"
              y2="76"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFEADF" />
              <stop offset="1" stopColor="#FFBB98" />
            </linearGradient>
            <linearGradient
              id={`${id}-purple`}
              x1="1.84955"
              y1="78.5"
              x2="239.85"
              y2="78.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F1EDFF" />
              <stop offset="1" stopColor="#634AF6" />
            </linearGradient>
          </defs>
        </svg>

        <div
          aria-hidden="true"
          className={`${svgClass} z-2`}
          style={{
            pointerEvents: "none",
            transformOrigin: "right",
            width: "calc(100% * 398 / 239.85)",
          }}
        >
          <div className="relative z-0 h-full w-full">
            {CONNECTOR_BLUR_LAYERS.map((layer, index) => (
              <div
                key={index}
                className="absolute inset-0"
                style={{
                  zIndex: index,
                  maskImage: layer.mask,
                  WebkitMaskImage: layer.mask,
                  maskSize: "100% 100%",
                  WebkitMaskSize: "100% 100%",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  backdropFilter: `blur(${layer.blur}px)`,
                  WebkitBackdropFilter: `blur(${layer.blur}px)`,
                }}
              />
            ))}
          </div>
        </div>
      </span>
    </div>
  );
}
