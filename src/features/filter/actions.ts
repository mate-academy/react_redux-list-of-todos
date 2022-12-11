import { Status } from '../../types/Status';
import { QueryAction, StatusAction } from './types';

const status = (value: Status): StatusAction => ({
  type: 'filter/Status',
  payload: value,
});

const query = (value: string): QueryAction => ({
  type: 'filter/Query',
  payload: value,
});

export const actions = { status, query };
