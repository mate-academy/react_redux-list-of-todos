export const updateNextPieceOfData = (
  totalItems: number,
  selectedPage: number,
  itemsPerPage: number,
) => {
  let start = 0;
  let finish = 0;

  for (let i = 1; i < totalItems; i += 1) {
    start = selectedPage * itemsPerPage - (itemsPerPage - 1);
    finish = ((selectedPage * itemsPerPage) < totalItems)
      ? selectedPage * itemsPerPage
      : totalItems;
  }

  return [start, finish];
};
