export const randomString = (length: number = 36): string => {
  return Array.from(
    Array(length),
    () => Math.floor(Math.random() * 36).toString(36)
  ).join('');
}

export const sleep = (milliseconds: number): void => {
  const date: number = Date.now();
  let currentDate: number;
  do currentDate = Date.now();
  while (currentDate - date < milliseconds);
}
