type FunctionDecorator = (...args: string[]) => void;

// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce(callback: Function, delay: number): FunctionDecorator {
  let timer = 0;

  return (...args: string[]) => {
    window.clearTimeout(timer);

    timer = window.setTimeout(() => callback(...args), delay);
  };
}
