import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import todoReducer from '../features/todoSlice';
import currentTodoReducer, { SET, SETBYID } from '../features/currentTodoSlice';
import filterReducer from '../features/filterSlice';

const listener = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    currentTodo: currentTodoReducer,
    filter: filterReducer,
  },
  middleware: gDM => gDM().prepend(listener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

listener.startListening({
  actionCreator: SETBYID,
  effect: (action, api) => {
    const state = api.getState() as RootState;
    const todoId = action.payload;
    const foundTodo = state.todos.find(todo => todo.id === todoId);

    if (foundTodo) {
      api.dispatch(SET(foundTodo));
    }
  },
});
