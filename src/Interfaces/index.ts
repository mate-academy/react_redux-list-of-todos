export interface User {
  name: string;
  email: string;
  phone: string;
}

export enum Options {
  all = "all",
  active = "active",
  completed = "completed",
}
