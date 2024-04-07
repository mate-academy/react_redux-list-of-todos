type StatusAllAction = { type: 'status/ALL' };
type StatusActiveAction = { type: 'status/ACTIVE' };
type StatusCompletedAction = { type: 'status/COMPLETED' };

const filterAll = (): StatusAllAction => ({ type: 'status/ALL' });
const filterActive = (): StatusActiveAction => ({ type: 'status/ACTIVE' });
const filterCompleted = (): StatusCompletedAction => ({ type: 'status/COMPLETED' });

// type queryAction

type Action = StatusAllAction | StatusActiveAction | StatusCompletedAction;

type State = {
  query: string,
  status: Action[keyof Action],
}

const initState: State = {
  query: '',
  status: 'status/ALL',
}

const filterReducer = (state: State = initState, action: Action) => {
  let copyState = {...state};
  const { query } = copyState;

  if (query) {
    return { ...copyState, query: query }
  }

  switch (action.type) {
    case 'status/ALL':
      return { ...copyState, status: 'status/ALL' };

    case 'status/ACTIVE':
      return { ...copyState, status: 'status/ACTIVE' };

    case 'status/COMPLETED':
      return { ...copyState, status: 'status/COMPLETED' };

    default:
      return initState;
  }
};

export const actions = {
  filterAll,
  filterActive,
  filterCompleted,
};

export default filterReducer;


