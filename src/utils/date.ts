/**
 * Date and Time utilities tailored for WIB (UTC+7)
 */

export function formatWIBTime(dateStringOrTimestamp: string | number | Date): string {
  const d = new Date(dateStringOrTimestamp);
  if (isNaN(d.getTime())) return '--:-- WIB';

  // Format in Asia/Jakarta timezone
  const hours = d.getUTCHours() + 7;
  const normalizedHours = (hours % 24).toString().padStart(2, '0');
  const minutes = d.getUTCMinutes().toString().padStart(2, '0');

  return `${normalizedHours}:${minutes} WIB`;
}

export function formatWIBDate(dateStringOrTimestamp: string | number | Date): string {
  const d = new Date(dateStringOrTimestamp);
  if (isNaN(d.getTime())) return '-';

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayName = days[d.getDay()];
  const dateNum = d.getDate().toString().padStart(2, '0');
  const monthName = months[d.getMonth()];

  return `${dayName}, ${dateNum} ${monthName}`;
}

export function formatSecondsToCountdown(totalSeconds: number): {
  hours: string;
  minutes: string;
  seconds: string;
  formatted: string;
} {
  if (totalSeconds <= 0) {
    return { hours: '00', minutes: '00', seconds: '00', formatted: '00h : 00m : 00s' };
  }

  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);

  const hours = h.toString().padStart(2, '0');
  const minutes = m.toString().padStart(2, '0');
  const seconds = s.toString().padStart(2, '0');

  return {
    hours,
    minutes,
    seconds,
    formatted: `${hours}h : ${minutes}m : ${seconds}s`,
  };
}

