export enum StatusEnum {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export type Status = StatusEnum.all | StatusEnum.active | StatusEnum.completed;
