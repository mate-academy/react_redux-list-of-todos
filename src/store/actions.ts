import { ActionTypes } from './types';

// const addTodos = (payload: Todo[]): AddTodosAction => ({
//   type: ActionTypes.AddTodos,
//   payload,
// });

// export const loadTodos = () => async (
//   dispatch: (arg0: { type: string; payload: Todo[]; }) => void,
// ) => {
//   const todos = await getTodos();

//   const addTodoAction = addTodos(todos);

//   dispatch(addTodoAction);
// };

// Action creators - a function returning an action object
export const startLoading = () => ({ type: ActionTypes.StartLoading });
export const finishLoading = (message = 'No message') => ({
  type: ActionTypes.FinishLoading,
  message,
});
