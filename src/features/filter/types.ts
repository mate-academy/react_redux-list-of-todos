import { Status } from '../../types/Status';
import { FILTER_QUERY, FILTER_STATUS } from '../../types/types';

export type StatusAction = { type: typeof FILTER_STATUS, payload: Status };
export type QueryAction = { type: typeof FILTER_QUERY, payload: string };
export type Action = StatusAction | QueryAction;

export type State = {
  status: Status,
  query: string,
};
