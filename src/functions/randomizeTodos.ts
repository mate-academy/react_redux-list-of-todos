import { ToDo } from '../types/ToDo';

export const randomize = (arr: ToDo[]) => {
  const result = [...arr];
  let currentIndex = arr.length;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [
      result[currentIndex],
      result[randomIndex],
    ] = [result[randomIndex], result[currentIndex]];
  }

  return result;
};
