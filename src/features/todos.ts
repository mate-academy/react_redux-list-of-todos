/*eslint-disable*/
import { Todo } from "../types/Todo";

type FetchAction = { type: "todos/LOAD"; payload: Todo[] };

const set = (todos: Todo[]): FetchAction => ({
  type: "todos/LOAD",
  payload: todos,
});

export const actions = { set };

const todosReducer = (todos: Todo[] = [], action: FetchAction) => {
  switch (action.type) {
    case "todos/LOAD":
      return [...todos, ...action.payload];
    default:
      return todos;
  }
};

export default todosReducer;
