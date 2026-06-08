import { useEffect, useRef, useState } from "react";

import { Link } from "@tanstack/react-router";
import logo from "@/assets/images/logo.svg";

type MenuItem = { label: string; to: string };

const productMenu: MenuItem[] = [
  { label: "Pricing", to: "/pricing" },
  { label: "Security", to: "/security" },
];

const resourcesMenu: MenuItem[] = [
  { label: "Blog", to: "/blog" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Changelog", to: "/changelog" },
];

const compareMenu: MenuItem[] = [
  { label: "vs ChatGPT", to: "/compare/viktor-vs-chatgpt" },
  { label: "vs OpenClaw", to: "/compare/viktor-vs-openclaw" },
  { label: "vs Claude", to: "/compare/viktor-vs-claude-in-slack" },
  { label: "vs Taskletor", to: "/compare/viktor-vs-taskletor" },
];

const solutionsMenu: MenuItem[] = [
  { label: "Integrations", to: "/integrations" },
  { label: "Use Cases", to: "/use-cases" },
];

function Caret({ open }: { open: boolean }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      className={`transition-transform duration-200 ${open ? "rotate-180 text-purple-500" : "text-foreground/40"}`}
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
}: {
  label: string;
  items: MenuItem[];
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
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
        className={`flex items-center gap-2 transition-colors text-sm cursor-pointer ${open ? "text-purple-500" : "hover:text-purple-500"}`}
      >
        {label} <Caret open={open} />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2 min-w-[160px] rounded-2xl bg-white py-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block px-5 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-black/[0.03] hover:text-foreground whitespace-nowrap"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileNavAccordion({
  label,
  items,
  open,
  onToggle,
  onNavigate,
}: {
  label: string;
  items: MenuItem[];
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="border-b border-black/[0.06] last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-[15px] font-medium text-foreground"
      >
        {label}
        <Caret open={open} />
      </button>
      {open && (
        <div className="pb-3 pl-1">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className="block py-2.5 text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
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
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#1A1829] text-white transition-opacity hover:opacity-90"
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

export function Nav() {
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

  const desktopBarClass =
    scrolled || mobileOpen
      ? "bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
      : "bg-white/10 backdrop-blur-[22px]";

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="px-5 pt-4 xl:px-10">
        <div className="mx-auto w-full max-w-[1360px]">
          {/* Desktop navbar */}
          <div className="relative isolate hidden w-full overflow-visible rounded-full lg:block">
            <div
              className={`relative z-10 h-full w-full rounded-full py-4 pr-4 pl-8 transition-all duration-300 ${desktopBarClass}`}
            >
              {!scrolled && (
                <>
                  <div
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      background:
                        "radial-gradient(100% 100%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 100%)",
                    }}
                  />

                  <div
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(-15deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.6) 100%)",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0)",
                      padding: "1px",
                    }}
                  />
                </>
              )}

              <div className="relative grid grid-cols-[1fr_auto_1fr] items-center">
                <Link to="/" className="block">
                  <img src={logo} alt="Viktor" width={80} height={24} />
                </Link>

                <nav className="flex cursor-pointer items-center gap-8">
                  <NavDropdown
                    label="Product"
                    items={productMenu}
                    open={openMenu === "product"}
                    onOpen={() => setOpenMenu("product")}
                    onClose={() => setOpenMenu(null)}
                  />

                  <Link to="/enterprise" className="text-sm transition-colors hover:text-purple-500">
                    Enterprise
                  </Link>

                  <NavDropdown
                    label="Resources"
                    items={resourcesMenu}
                    open={openMenu === "resources"}
                    onOpen={() => setOpenMenu("resources")}
                    onClose={() => setOpenMenu(null)}
                  />

                  <NavDropdown
                    label="Compare"
                    items={compareMenu}
                    open={openMenu === "compare"}
                    onOpen={() => setOpenMenu("compare")}
                    onClose={() => setOpenMenu(null)}
                  />

                  <NavDropdown
                    label="Solutions"
                    items={solutionsMenu}
                    open={openMenu === "solutions"}
                    onOpen={() => setOpenMenu("solutions")}
                    onClose={() => setOpenMenu(null)}
                  />
                </nav>

                <div className="flex justify-end gap-3">
                  <a
                    href="/login"
                    className="rounded-full border border-[#E0E0E0] px-5 py-2 text-sm hover:bg-black/5"
                  >
                    Login
                  </a>
                  <Link to="/get-started" className="rounded-full bg-black px-5 py-2 text-sm text-white">
                    Get Started For Free
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile navbar */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between rounded-full bg-white px-6 py-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <Link to="/" className="block" onClick={closeMobileMenu}>
                <img src={logo} alt="Viktor" width={80} height={24} />
              </Link>
              <MenuToggleButton
                open={mobileOpen}
                onClick={() => (mobileOpen ? closeMobileMenu() : setMobileOpen(true))}
              />
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
                  />

                  <Link
                    to="/enterprise"
                    onClick={closeMobileMenu}
                    className="flex items-center border-b border-black/[0.06] py-4 text-[15px] font-medium text-foreground"
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
                  />

                  <MobileNavAccordion
                    label="Compare"
                    items={compareMenu}
                    open={mobileAccordion === "compare"}
                    onToggle={() =>
                      setMobileAccordion((prev) => (prev === "compare" ? null : "compare"))
                    }
                    onNavigate={closeMobileMenu}
                  />

                  <MobileNavAccordion
                    label="Solutions"
                    items={solutionsMenu}
                    open={mobileAccordion === "solutions"}
                    onToggle={() =>
                      setMobileAccordion((prev) => (prev === "solutions" ? null : "solutions"))
                    }
                    onNavigate={closeMobileMenu}
                  />
                </nav>

                <div className="flex flex-col gap-3 border-t border-black/[0.06] py-5">
                  <a
                    href="/login"
                    onClick={closeMobileMenu}
                    className="block rounded-full border border-[#E0E0E0] px-5 py-3 text-center text-sm font-medium text-foreground hover:bg-black/5"
                  >
                    Login
                  </a>
                  <Link
                    to="/get-started"
                    onClick={closeMobileMenu}
                    className="block rounded-full bg-[#1A1829] px-5 py-3 text-center text-sm font-medium text-white"
                  >
                    Get Started for Free
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
