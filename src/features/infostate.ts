type SetError = {
  type: 'infostate/error/SET';
  payload: boolean;
};

type SetLoading = {
  type: 'infostate/loading/SET';
  payload: boolean;
};

const setError = (value: boolean): SetError => ({
  type: 'infostate/error/SET',
  payload: value,
});
const setLoading = (value: boolean): SetLoading => ({
  type: 'infostate/loading/SET',
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
const infostateReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'infostate/error/SET':
      return { ...state, error: action.payload };
    case 'infostate/loading/SET':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default infostateReducer;
