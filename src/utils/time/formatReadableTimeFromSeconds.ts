export function formatReadableTimeFromSeconds(seconds: number): string {
  const date = new Date(seconds * 1000);

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    hour12: true,
    timeZone: 'UTC',
  };

  if (date.getMinutes() > 0) {
    options.minute = 'numeric';
  }

  return date.toLocaleTimeString('en-US', options).replace(' ', '\u202f');
}
