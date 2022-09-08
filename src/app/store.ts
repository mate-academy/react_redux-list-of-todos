// import { useMemo } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import currentTodoReducer from '../features/currentTodo';
import filterReducer, { FilterType } from '../features/filter';
import todosReducer from '../features/todos';
// import { Todo } from '../types/Todo';

const rootReducer = combineReducers({
  currentTodo: currentTodoReducer,
  filter: filterReducer,
  todos: todosReducer,
});

// const filtredByComleted = (
//   nameFilter: string,
//   todosList: Todo[],
// ): Todo[] => {
//   switch (nameFilter) {
//     case 'completed':
//       return todosList.filter(item => item.completed === true);

//     case 'active':
//       return todosList.filter(item => item.completed === false);

//     case 'all':
//       return todosList;

//     default:
//       return todosList;
//   }
// };

// const filredByQuery = (
//   searchQury: string, todosList: Todo[],
// ): Todo[] => {
//   if (searchQury === '') {
//     return todosList;
//   }

//   return (todosList
//     .filter(
//       item => item.title.toLowerCase().includes(searchQury.toLowerCase()),
//     ));
// };

// const filteredArray = useMemo(() => {
//   const filteredBySelect = filtredByComleted(filterType, todos);

//   return filredByQuery(appliedQuery, filteredBySelect);
// }, [filterType, appliedQuery, todos]);

// const filterTodos = (state: RootState): Todo[] => {
//   const { filterType, appliedQuery } = state.filter;
//   const { todos } = state;

//   let todosFilteredByType;

//   switch (filterType) {
//     case 'completed':
//       todosFilteredByType = todos.filter(item => item.completed === true);
//       break;

//     case 'active':
//       todosFilteredByType = todos.filter(item => item.completed === false);
//       break;

//     case 'all':
//     default:
//       todosFilteredByType = todos;
//       break;
//   }

//   if (appliedQuery === '') {
//     return todosFilteredByType;
//   }

//   return (todosFilteredByType
//     .filter(
//       item => item.title.toLowerCase().includes(appliedQuery.toLowerCase()),
//     ));
// };

export const selector = {
  getSelectedTodo: (state: RootState) => state.currentTodo,
  getTodos: (state: RootState) => {
    const { todos } = state;
    const { filterType, appliedQuery } = state.filter;

    return todos.filter(todo => {
      const isQuery = todo.title.toLowerCase()
        .includes(appliedQuery.toLowerCase());

      switch (filterType) {
        case FilterType.Active:
          return isQuery && !todo.completed;
        case FilterType.Completed:
          return isQuery && todo.completed;
        case FilterType.All:
          return isQuery;
        default:
          return true;
      }
    });
  },
};

// The `store` is passed to the Provider in `/src/index.tsx`
export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
