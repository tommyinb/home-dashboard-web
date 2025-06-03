export function getWeekday(date: Date) {
  const day = date.getDay();

  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day];
}
