import { useEffect } from "react";

export function useCenteredScroll() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a[href^='/#']");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.length < 2) return;

      const target = document.getElementById(href.slice(2));

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        history.pushState(null, "", href);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}