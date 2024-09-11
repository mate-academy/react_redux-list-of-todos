export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
export type StatusKey = keyof typeof Status;
