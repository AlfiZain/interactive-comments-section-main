export function formatRelativeTime(date) {
  const relativeTimeFormat = new Intl.RelativeTimeFormat('en-US', {
    numeric: 'always',
  });

  const dateObject = date instanceof Date ? date : new Date(date);

  const now = new Date();
  const diffInSeconds = Math.floor((dateObject - now) / 1000);

  const divisions = [
    { amount: 60, unit: 'second' },
    { amount: 60, unit: 'minute' },
    { amount: 24, unit: 'hour' },
    { amount: 7, unit: 'day' },
    { amount: 4.34524, unit: 'week' },
    { amount: 12, unit: 'month' },
    { amount: Number.POSITIVE_INFINITY, unit: 'year' },
  ];

  let duration = diffInSeconds;
  for (let i = 0; i < divisions.length; i++) {
    const division = divisions[i];
    if (Math.abs(duration) < division.amount) {
      return relativeTimeFormat.format(Math.round(duration), division.unit);
    }
    duration /= division.amount;
  }
}
