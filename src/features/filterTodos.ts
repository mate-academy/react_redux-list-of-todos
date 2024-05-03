import { Status } from '../types/Status';

type ActionAll = { type: 'filter/ALL' };
type ActionActive = { type: 'filter/ACTIVE' };
type ActionCompleted = { type: 'filter/COMPLETED' };

type Action = ActionAll | ActionActive | ActionCompleted;

const filterAll = (): ActionAll => ({ type: 'filter/ALL' });
const filterActive = (): ActionActive => ({ type: 'filter/ACTIVE' });
const filterCompleted = (): ActionCompleted => ({ type: 'filter/COMPLETED' });

export const actionsFilter = {
  filterAll,
  filterActive,
  filterCompleted,
};

const filterReducer = (state: Status = 'all', action: Action) => {
  switch (action.type) {
    case 'filter/ALL':
      return 'all';
    case 'filter/ACTIVE':
      return 'active';
    case 'filter/COMPLETED':
      return 'completed';
    default:
      return state;
  }
};

export default filterReducer;
