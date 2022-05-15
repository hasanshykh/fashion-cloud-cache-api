export const randomString = (length: number = 36): string => {
  return Array.from(
    Array(length),
    () => Math.floor(Math.random() * 36).toString(36)
  ).join('');
}
