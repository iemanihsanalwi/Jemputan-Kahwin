import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to Malay localized string
 */
export function formatMalayDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ms-MY", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Format relative time ago in Malay
 */
export function formatTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Sebentar tadi";
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes} minit lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} jam lalu`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} hari lalu`;
    return formatMalayDate(dateString);
  } catch {
    return "";
  }
}

/**
 * Clean phone number for WhatsApp link
 */
export function cleanPhoneNumber(phone: string): string {
  // Remove non-digit characters except +
  let cleaned = phone.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "60" + cleaned.slice(1);
  }
  return cleaned;
}

/**
 * Generate Google Calendar Add Event URL
 */
export function createGoogleCalendarUrl(params: {
  title: string;
  details: string;
  location: string;
  startDate: string; // YYYY-MM-DD
  startTime?: string; // HH:mm
  endTime?: string;
}): string {
  const { title, details, location, startDate } = params;
  // e.g. 20261212T030000Z (UTC: Malaysia is UTC+8)
  // 11:00 AM MYT = 03:00 UTC
  // 16:00 PM MYT = 08:00 UTC
  const dateFormatted = startDate.replace(/-/g, "");
  const start = `${dateFormatted}T030000Z`;
  const end = `${dateFormatted}T080000Z`;

  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", title);
  url.searchParams.set("details", details);
  url.searchParams.set("location", location);
  url.searchParams.set("dates", `${start}/${end}`);

  return url.toString();
}

/**
 * Generate and download .ics file for Apple Calendar / Outlook
 */
export function downloadIcsFile(params: {
  title: string;
  details: string;
  location: string;
  startDate: string;
}) {
  const dateFormatted = params.startDate.replace(/-/g, "");
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Walimatulurus Wedding Invitation//MS//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `SUMMARY:${params.title}`,
    `DESCRIPTION:${params.details}`,
    `LOCATION:${params.location}`,
    `DTSTART:${dateFormatted}T030000Z`,
    `DTEND:${dateFormatted}T080000Z`,
    `STATUS:CONFIRMED`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "Jemputan-Walimatulurus.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export array of data to CSV file download
 */
export function exportToCsv(filename: string, rows: Record<string, unknown>[]) {
  if (!rows || !rows.length) return;

  const separator = ",";
  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(separator) +
    "\n" +
    rows
      .map((row) => {
        return keys
          .map((k) => {
            const val = row[k];
            let cell =
              val === null || val === undefined
                ? ""
                : val instanceof Date
                  ? val.toLocaleString("ms-MY")
                  : String(val);
            cell = cell.replace(/"/g, '""');
            if (cell.search(/("|,|\n)/g) >= 0) {
              cell = `"${cell}"`;
            }
            return cell;
          })
          .join(separator);
      })
      .join("\n");

  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
