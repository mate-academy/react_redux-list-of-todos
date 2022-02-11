import {combineReducers} from "redux";
import loadingReducer from "./loading";
import todoReducer from "./todos";
import queryReducer from "./query";
import sortReducer from "./sort";


type TodoComparator = (a: Todo, b: Todo) => number;


// Selectors
export const getLoading = (state: RootState) => state.loading;
export const getTodos = (state: RootState) => state.todos;
export const getQuery = (state: RootState) => state.query;


export const getVisibleTodos = (state: RootState) => {
  let compare: TodoComparator = () => 0;

  switch (state.sort.field) {
    case 'title':
      compare = (a: Todo, b: Todo) => a.title.localeCompare(b.title);
      break;
    case 'completed':
      compare = (a: Todo, b: Todo) => Number(b.completed) - Number(a.completed);
      break;
    case 'id':
      compare = (a: Todo, b: Todo) => a.id - b.id;
      break;
    default:

  }

  const visibleTodos = state.todos
    .filter(todo => todo.title.includes(state.query))
    .sort(compare)

  if (state.sort.order === 'DESC') {
    visibleTodos.reverse();
  }

  return visibleTodos;
};


export const rootReducer = combineReducers({
  loading: loadingReducer,
  todos: todoReducer,
  query: queryReducer,
  sort: sortReducer
})

export type RootState = ReturnType<typeof rootReducer>
