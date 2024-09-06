export function debounce(callback: (...args: any[]) => void, delay: number) {
  let timer: number | undefined;

  return (...args: any[]) => {
    if (timer) {
      window.clearTimeout(timer);
    }

    timer = window.setTimeout(() => callback(...args), delay);
  };
}
