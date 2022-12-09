import { Status } from '../../types/Status';

export type StatusAction = { type: 'filter/Status', payload: Status };
export type QueryAction = { type: 'filter/Query', payload: string };
export type Action = StatusAction | QueryAction;

export type State = {
  status: Status,
  query: string,
};
