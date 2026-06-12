import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { GetFreeCreditsModal } from "./GetFreeCreditsModal";
import { InviteTeamMembersModal } from "./InviteTeamMembersModal";
import { MobileMenuButton, Sidebar } from "./Sidebar";
import { ViktorLogo } from "./ViktorLogo";

export type DashboardOutletContext = {
  openInviteModal: () => void;
};

export function DashboardLayout() {
  const [creditsModalOpen, setCreditsModalOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!sidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setSidebarOpen(false);
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    function handleChange() {
      if (mediaQuery.matches) setSidebarOpen(false);
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="dashboard-shell flex h-screen overflow-hidden bg-background">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <header className="fixed top-0 right-0 left-0 z-30 flex items-center justify-between border-b border-border bg-background px-5 py-4 md:hidden">
        <ViktorLogo />
        <MobileMenuButton
          open={sidebarOpen}
          onClick={() => setSidebarOpen((open) => !open)}
        />
      </header>

      <Sidebar
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
        onGetFreeCredits={() => setCreditsModalOpen(true)}
        onInviteTeammates={() => setInviteModalOpen(true)}
      />
      <main className="min-w-0 flex-1 overflow-y-auto bg-background pt-[72px] md:pt-0">
        <Outlet context={{ openInviteModal: () => setInviteModalOpen(true) }} />
      </main>
      <GetFreeCreditsModal open={creditsModalOpen} onClose={() => setCreditsModalOpen(false)} />
      <InviteTeamMembersModal
        open={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
      />
    </div>
  );
}
