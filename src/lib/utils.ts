import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { sections } from "./config";
import { MouseEvent } from "react";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const pick = <T extends object, K extends keyof T>(object: T, keys: readonly K[]) =>
  Object.fromEntries(keys.map((key) => [key, object[key]])) as Pick<T, K>

const pad = (n: number) => n.toString().padStart(2, "0")

// Formats a calendar date as dd/mm/yyyy, the format parseDate reads
export const formatDate = (date: Date) =>
  `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`

// Parses a dd/mm/yyyy date, or returns null if it isn't a real calendar date
export const parseDate = (value: string) => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return null;

  const [day, month, year] = match.slice(1).map(Number);
  const date = new Date(year, month - 1, day);

  // Date rolls overflowing values over, so 31/02 would silently become 02/03
  if (date.getDate() !== day || date.getMonth() !== month - 1) return null;

  return date;
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
