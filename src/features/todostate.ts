type SetError = {
  type: 'todostate/error/SET';
  payload: boolean;
};

type SetLoading = {
  type: 'todostate/loading/SET';
  payload: boolean;
};

const setError = (value: boolean): SetError => ({
  type: 'todostate/error/SET',
  payload: value,
});
const setLoading = (value: boolean): SetLoading => ({
  type: 'todostate/loading/SET',
  payload: value,
});

type State = {
  error: boolean;
  loading: boolean;
};

const initialState: State = {
  error: false,
  loading: false,
};

type Action = SetError | SetLoading;

export const actions = { setError, setLoading };

/* eslint-disable */
const todostateReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'todostate/error/SET':
      return { ...state, error: action.payload };
    case 'todostate/loading/SET':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default todostateReducer;
