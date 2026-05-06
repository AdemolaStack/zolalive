export function formatKickoff(dateInput) {
  const date = new Date(dateInput);
  return date.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).replace(",", " ·");
}

export function pad(n) {
  return String(n).padStart(2, "0");
}