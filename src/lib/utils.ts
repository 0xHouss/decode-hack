import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { sections } from "./config";
import { MouseEvent } from "react";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const formatDate = (date: Date) => date.toLocaleString("fr-DZ", {
  timeZone: "Africa/Algiers",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
})

export const parseDate = (date: string) => {
  const [day, month, year] = date.split("/").map(Number);
  return new Date(year, month - 1, day);
};

export function handleScroll(e: MouseEvent, section: typeof sections[0]) {
  const targetId = section.href.split("#")[1];
  const target = document.getElementById(targetId);

  if (!target) return

  e.preventDefault();

  target.scrollIntoView({
    behavior: "smooth",
    block: section.centerScroll ? "center" : "start",
  });

  history.pushState(null, "", section.href);
}
