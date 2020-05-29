export enum SortFields {
  Id = 'id',
  Name = 'username',
  Title = 'title',
  Completed = 'completed',
}

export const HEADERS: SortButton[] = [
  {
    name: 'Id',
    field: SortFields.Id,
  },
  {
    name: 'Name',
    field: SortFields.Name,
  },
  {
    name: 'Title',
    field: SortFields.Title,
  },
  {
    name: 'Completed',
    field: SortFields.Completed,
  },
];
