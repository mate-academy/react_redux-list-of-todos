type SetQueryAction = {
  type: 'filter/SETQUERY';
  payload: string;
};

// type Status = 'all' | 'active' | 'completed';

type SetStatusAction = {
  type: 'filter/STATUS';
  payload: string;
};

const setQuery = (text: string): SetQueryAction => ({
  type: 'filter/SETQUERY',
  payload: text,
});

const setStatus = (status: string): SetStatusAction => ({
  type: 'filter/STATUS',
  payload: status,
});

export const actionsFilter = { setQuery, setStatus };

type StateFilter = {
  query: string;
  status: string;
};

type Action = SetQueryAction | SetStatusAction;

const initialState: StateFilter = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: StateFilter = initialState, action: Action,
): StateFilter => {
  switch (action.type) {
    case 'filter/SETQUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/STATUS':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
