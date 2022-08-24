const SET_TODO = 'SET_TODO';

export const actions = {
  setTodo: (todoId: number) => ({ type: SET_TODO, payload: todoId }),
};

type Action = {
  type: 'SET_TODO',
  payload: number,
};

export const selectors = {
  getTodo: (todoId: number) => todoId,
};

const initialState = 0;

const loadingReducer = (state = initialState, action: Action): number => {
  switch (action.type) {
    case SET_TODO:
      return action.payload;
    default:
      return state;
  }
};

export default loadingReducer;
