import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Todo } from '../types/Todo';

type SelectTodoAction = {
  type: 'SELECT_TODO';
  payload: Todo | null;
};

type Action = (
  SelectTodoAction
);

type RootState = {
  selectedTodo: Todo | null;
};

const initialState: RootState = {
  selectedTodo: null,
};

const rootReducer = (state = initialState, action: Action): RootState => {
  switch (action.type) {
    case 'SELECT_TODO':
      return {
        ...state,
        selectedTodo: action.payload,
      };

    default:
      return state;
  }
};

export const actions = {
  selectTodo: (todo: Todo | null): SelectTodoAction => ({
    type: 'SELECT_TODO',
    payload: todo,
  }),
};

export const selectors = {
  selectedTodo: (state: RootState) => state.selectedTodo,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools( // allows you to use https://github.com/reduxjs/redux-devtools/tree/main/extension#redux-devtools-extension
    applyMiddleware(thunk),
  ),
);
