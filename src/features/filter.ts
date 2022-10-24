type SetStatusAction = {
  type: 'filter/SET_STATUS',
  payload: string,
};

type SetQweryAction = {
  type: 'filter/SET_QWERY',
  payload: string,
};

type DeleteQweryAction = {
  type: 'filter/DELETE_QWERY',
};

const setStatus = (status: string): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const setQwery = (qwery: string): SetQweryAction => ({
  type: 'filter/SET_QWERY',
  payload: qwery,
});

const deleteQwery = (): DeleteQweryAction => ({
  type: 'filter/DELETE_QWERY',
});

export const actions = {
  setStatus,
  setQwery,
  deleteQwery,
};

type State = {
  status: string | null,
  query: string | null,
} | null;

type Action = SetStatusAction | SetQweryAction | DeleteQweryAction;

const filterReducer = (
  state: State = null,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/SET_QWERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/DELETE_QWERY':
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export default filterReducer;
