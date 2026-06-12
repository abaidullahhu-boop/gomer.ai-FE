import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToTarget);
      });
      return;
    }

    window.scrollTo(0, 0);
    document.querySelector<HTMLElement>(".dashboard-shell main")?.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
