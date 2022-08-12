type SetLoadingAction = {
  type: 'todos/LOADING';
  payload: boolean;
};

type SetErrorAction = {
  type: 'todos/ERROR';
  payload: boolean;
};

type Action = (
  | SetLoadingAction
  | SetErrorAction
);

type TodosState = {
  loading: boolean;
  error: boolean;
};

const initialState: TodosState = {
  loading: false,
  error: false,
};

const todosReducer = (state = initialState, action: Action): TodosState => {
  switch (action.type) {
    case 'todos/LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'todos/ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const actions = {
  setLoading: (loadingState: boolean): SetLoadingAction => (
    { type: 'todos/LOADING', payload: loadingState }
  ),

  setError: (errorState: boolean): SetErrorAction => (
    { type: 'todos/ERROR', payload: errorState }
  ),
};

export default todosReducer;
