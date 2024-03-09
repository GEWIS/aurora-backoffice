export function getIsoTime(): string {
  return new Date().toISOString();
}

export function convetIsoTime(time: Date): string {
  return time.toISOString();
}
