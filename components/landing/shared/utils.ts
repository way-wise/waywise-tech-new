import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Class-name merge helper used by the landing pages (copied from company-site-frontend). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
