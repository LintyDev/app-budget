export function hexToRGB(hex: string, alpha: string | number) {

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return `rgb(${r}, ${g}, ${b})`;
}

export function numberDB(n: string) {
  return +n.replace(',', '.');
}

export function currentMonthYear() : string {
  const date = new Date();
  const fullDate = date.toLocaleDateString().split('/');
  const monthYear = fullDate[1] + '-' + fullDate[2];
  return monthYear;
}