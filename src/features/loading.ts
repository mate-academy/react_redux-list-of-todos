type SetLoading = {
  type: 'SET_TODOS_LOADING',
  payload: boolean,
};

type RemoveLoading = {
  type: 'REMOVE_TODOS_LOADING',
  payload: boolean,
};

type Action = (SetLoading | RemoveLoading);

const setLoading = ():SetLoading => (
  { type: 'SET_TODOS_LOADING', payload: true });

const removeLoading = ():RemoveLoading => (
  { type: 'REMOVE_TODOS_LOADING', payload: false });

export const loaderActions = (
  {
    setLoading,
    removeLoading,
  }
);

const initialState = true;

const loadingReducer = (
  state = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'SET_TODOS_LOADING':
      return true;
    case 'REMOVE_TODOS_LOADING':
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
