import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
