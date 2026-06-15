import { useEffect, useRef, useState } from "react";

import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/images/logo.svg";
import { GetStartedButton } from "@/components/site/GetStartedButton";

type MenuItem = { label: string; to: string };

const productMenu: MenuItem[] = [
  { label: "Pricing", to: "/pricing" },
  { label: "Security", to: "/security" },
];

const resourcesMenu: MenuItem[] = [
  { label: "Blog", to: "/blog" },
  { label: "Research", to: "/research" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Changelog", to: "/changelog" },
];

const compareMenu: MenuItem[] = [
  { label: "vs ChatGPT", to: "/compare/gomer-vs-chatgpt" },
  { label: "vs OpenClaw", to: "/compare/gomer-vs-openclaw" },
  { label: "vs Claude in Slack", to: "/compare/gomer-vs-claude-in-slack" },
  { label: "vs Tasklet", to: "/compare/gomer-vs-tasklet" },
];

const solutionsMenu: MenuItem[] = [
  { label: "Integrations", to: "/integrations" },
  { label: "Use Cases", to: "/use-cases" },
];

const dropdownLinkClass =
  "rounded-xl px-3 py-2 text-sm text-[#1a182b] transition-colors hover:bg-black/5 focus:bg-black/5 focus:outline-none whitespace-nowrap";

type NavTheme = {
  link: string;
  linkOpen: string;
  caretClosed: string;
  caretOpen: string;
};

function getNavTheme(): NavTheme {
  return {
    link: "text-foreground hover:text-purple-500",
    linkOpen: "text-purple-500",
    caretClosed: "text-[#9693a3]",
    caretOpen: "text-purple-500",
  };
}

const navMobileCtaButtonClass = "py-3";

function NavGlassLayers() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-full"
        style={{
          background:
            "radial-gradient(100% 100% at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-full"
        style={{
          background:
            "linear-gradient(-15deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.6) 100%)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-full"
        style={{ filter: "blur(5px)", WebkitFilter: "blur(5px)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(-15deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,1) 100%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "4px",
          }}
        />
      </div>
    </>
  );
}

function Caret({ open, closedClass, openClass }: { open: boolean; closedClass: string; openClass: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      className={`transition-transform duration-200 ${open ? `rotate-180 ${openClass}` : closedClass}`}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.95 3.26c.21-.42.72-.6 1.15-.38.42.21.6.72.38 1.15-1.11 2.22-2.27 3.52-4.3 4.67a1.7 1.7 0 0 1-2.36 0C2.79 7.55 1.63 6.25.52 4.03A.86.86 0 1 1 2.05 3.26C3.03 5.22 3.97 6.25 5.67 7.21c.2.12.46.12.66 0 1.7-.96 2.63-1.99 3.62-3.95Z"
      />
    </svg>
  );
}

function NavDropdown({
  label,
  items,
  open,
  onOpen,
  onClose,
  theme,
}: {
  label: string;
  items: MenuItem[];
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  theme: NavTheme;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => (open ? onClose() : onOpen())}
        className={`flex items-center gap-2 transition-colors text-sm font-medium cursor-pointer ${open ? theme.linkOpen : theme.link}`}
      >
        {label} <Caret open={open} closedClass={theme.caretClosed} openClass={theme.caretOpen} />
      </button>

      <div
        className={`absolute top-full left-1/2 z-50 w-max min-w-44 -translate-x-1/2 pt-3 transition duration-150 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div
          role="menu"
          aria-label={label}
          className="grid gap-1 rounded-xl border border-white/50 bg-white/88 p-2 shadow-[0_20px_48px_rgba(26,24,43,0.14)] backdrop-blur-xl"
        >
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              role="menuitem"
              className={({ isActive }) =>
                `${dropdownLinkClass}${isActive ? " bg-black/5" : ""}`
              }
              onClick={onClose}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileNavAccordion({
  label,
  items,
  open,
  onToggle,
  onNavigate,
  caretClosedClass,
  caretOpenClass,
}: {
  label: string;
  items: MenuItem[];
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  caretClosedClass: string;
  caretOpenClass: string;
}) {
  return (
    <div className="">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="cursor-pointer flex w-full items-center justify-between py-4 text-xl text-foreground font-medium"
      >
        {label}
        <Caret open={open} closedClass={caretClosedClass} openClass={caretOpenClass} />
      </button>
      {open && (
        <div className="mb-3 flex flex-col gap-1 rounded-2xl bg-[#f5f5f5] px-4 py-3">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `rounded-xl px-1 py-2 text-xl font-medium text-[#2d2e32] transition-colors hover:bg-black/5 focus:bg-black/5 focus:outline-none${
                  isActive ? " bg-black/[0.06]" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

function MenuToggleButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onClick}
      className="cursor-pointer flex h-8 w-12 shrink-0 items-center justify-center rounded-lg bg-[#1A1829] text-white transition-opacity hover:opacity-90"
    >
      {open ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M2 2L12 12M12 2L2 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
          <path d="M0 1H16M0 6H16M0 11H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}

type NavProps = {
  heroTone?: "dark" | "light";
};

export function Nav({ heroTone = "dark" }: NavProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  function closeMobileMenu() {
    setMobileOpen(false);
    setMobileAccordion(null);
  }

  const navBarClass =
    scrolled || mobileOpen
      ? "bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
      : "bg-white/10 backdrop-blur-[22px] transition-colors duration-200 ease-out";

  const showGlassOverlay = !scrolled && !mobileOpen;
  const theme = getNavTheme();
  const mobileCaretClosedClass = "text-[#9693a3]";
  const mobileCaretOpenClass = "text-purple-500";

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="px-5 pt-4 xl:px-10">
        <div className="mx-auto w-full max-w-[1360px]">
          {/* Desktop navbar */}
          <div className="relative isolate hidden w-full overflow-visible rounded-full xl:block">
            <div
              className={`relative h-full min-h-0 w-full rounded-full py-4 pr-4 pl-8 ${navBarClass}`}
            >
              {showGlassOverlay && <NavGlassLayers />}

              <div className="relative z-10 h-full min-h-0 w-full">
                <div className="relative z-10 grid h-full w-full grid-cols-[1fr_auto_1fr] items-center">
                <div className="min-w-0">
                <Link to="/" aria-label="Gomer home" className="block">
                  <img src={logo} alt="Gomer" width={112} height={28} />
                </Link>
                </div>

                <nav className="flex shrink-0 items-center gap-8" aria-label="Main">
                  <NavDropdown
                    label="Product"
                    items={productMenu}
                    open={openMenu === "product"}
                    onOpen={() => setOpenMenu("product")}
                    onClose={() => setOpenMenu(null)}
                    theme={theme}
                  />

                  <Link to="/enterprise" className={`text-sm font-medium transition-colors ${theme.link}`}>
                    Enterprise
                  </Link>

                  <NavDropdown
                    label="Resources"
                    items={resourcesMenu}
                    open={openMenu === "resources"}
                    onOpen={() => setOpenMenu("resources")}
                    onClose={() => setOpenMenu(null)}
                    theme={theme}
                  />

                  <NavDropdown
                    label="Compare"
                    items={compareMenu}
                    open={openMenu === "compare"}
                    onOpen={() => setOpenMenu("compare")}
                    onClose={() => setOpenMenu(null)}
                    theme={theme}
                  />

                  <NavDropdown
                    label="Solutions"
                    items={solutionsMenu}
                    open={openMenu === "solutions"}
                    onOpen={() => setOpenMenu("solutions")}
                    onClose={() => setOpenMenu(null)}
                    theme={theme}
                  />
                </nav>

                <div className="flex min-w-0 items-center justify-end">
                  <GetStartedButton variant="nav" />
                </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile navbar */}
          <div className="xl:hidden">
            <div className="relative isolate w-full overflow-visible rounded-full">
              <div
                className={`relative h-full min-h-0 w-full rounded-full px-6 py-3 ${navBarClass}`}
              >
                {showGlassOverlay && <NavGlassLayers />}

                <div className="relative z-10 flex items-center justify-between">
                <Link to="/" className="relative block" onClick={closeMobileMenu}>
                  <img src={logo} alt="Gomer" width={112} height={28} />
                </Link>
                <MenuToggleButton
                  open={mobileOpen}
                  onClick={() => (mobileOpen ? closeMobileMenu() : setMobileOpen(true))}
                />
                </div>
              </div>
            </div>

            {mobileOpen && (
              <div className="mt-3 rounded-3xl bg-white px-6 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
                <nav>
                  <MobileNavAccordion
                    label="Product"
                    items={productMenu}
                    open={mobileAccordion === "product"}
                    onToggle={() =>
                      setMobileAccordion((prev) => (prev === "product" ? null : "product"))
                    }
                    onNavigate={closeMobileMenu}
                    caretClosedClass={mobileCaretClosedClass}
                    caretOpenClass={mobileCaretOpenClass}
                  />

                  <Link
                    to="/enterprise"
                    onClick={closeMobileMenu}
                    className="flex items-center py-4 text-xl font-medium text-foreground"
                  >
                    Enterprise
                  </Link>

                  <MobileNavAccordion
                    label="Resources"
                    items={resourcesMenu}
                    open={mobileAccordion === "resources"}
                    onToggle={() =>
                      setMobileAccordion((prev) => (prev === "resources" ? null : "resources"))
                    }
                    onNavigate={closeMobileMenu}
                    caretClosedClass={mobileCaretClosedClass}
                    caretOpenClass={mobileCaretOpenClass}
                  />

                  <MobileNavAccordion
                    label="Compare"
                    items={compareMenu}
                    open={mobileAccordion === "compare"}
                    onToggle={() =>
                      setMobileAccordion((prev) => (prev === "compare" ? null : "compare"))
                    }
                    onNavigate={closeMobileMenu}
                    caretClosedClass={mobileCaretClosedClass}
                    caretOpenClass={mobileCaretOpenClass}
                  />

                  <MobileNavAccordion
                    label="Solutions"
                    items={solutionsMenu}
                    open={mobileAccordion === "solutions"}
                    onToggle={() =>
                      setMobileAccordion((prev) => (prev === "solutions" ? null : "solutions"))
                    }
                    onNavigate={closeMobileMenu}
                    caretClosedClass={mobileCaretClosedClass}
                    caretOpenClass={mobileCaretOpenClass}
                  />
                </nav>

                <div className="flex flex-col gap-3 border-t border-black/[0.06] py-5">
                  <GetStartedButton
                    variant="nav"
                    fullWidth
                    className={navMobileCtaButtonClass}
                    onClick={closeMobileMenu}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
