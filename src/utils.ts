export function debounce<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
) {
  let timer: number | undefined;

  return (...args: T) => {
    if (timer) {
      window.clearTimeout(timer);
    }

    timer = window.setTimeout(() => callback(...args), delay);
  };
}
