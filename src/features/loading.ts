type State = {
  todos: boolean;
  modal: boolean;
};

type SetTodosAction = {
  type: 'loading/SET_TODOS';
  payload: boolean;
};

type SetModalAction = {
  type: 'loading/SET_MODAL';
  payload: boolean;
};

type Action = SetTodosAction | SetModalAction;

const setTodosAction = (isLoading: boolean): SetTodosAction => ({
  type: 'loading/SET_TODOS',
  payload: isLoading,
});

const setModalAction = (isLoading: boolean): SetModalAction => ({
  type: 'loading/SET_MODAL',
  payload: isLoading,
});

export const actions = {
  setTodosAction,
  setModalAction,
};

const initialState: State = {
  todos: false,
  modal: false,
};

export const loadingReducer = (
  state: State = initialState,
  { type, payload }: Action,
) => {
  switch (type) {
    case 'loading/SET_TODOS':
      return {
        ...state,
        todos: payload,
      };
    case 'loading/SET_MODAL':
      return {
        ...state,
        modal: payload,
      };
    default:
      return state;
  }
};
