import { Status } from './types/Status';

export const todoMatchesQuery = (query: string, title: string) =>
  title.toLowerCase().includes(query.trim().toLowerCase());

export const filterByStatus = (completed: boolean, status: Status) => {
  switch (status) {
    case Status.Active:
      return !completed;
    case Status.Completed:
      return completed;
    default:
      return true;
  }
};
