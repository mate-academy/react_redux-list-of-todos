import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import TodosList from './TodosList'
import Todos from './api/todos'
import Users from './api/users'

const API_DATA = (todos, users) => {
  let todosWithUsers = [];

  todosWithUsers = todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));

  return todosWithUsers;
}

const initialState = {
  todos: API_DATA(Todos, Users),
  direction: 1,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SORT_BY_NAME':
      return {
        ...state,
        direction: state.direction === 1 ? -1 : 1,
        todos: [...state.todos].sort((a, b) => (
          state.direction * (a.user.name.localeCompare(b.user.name))
        ))
      }

    case 'SORT_BY_TITLE':
      return {
        ...state,
        direction: state.direction === 1 ? -1 : 1,
        todos: [...state.todos].sort((a, b) => (
          state.direction * (a.title.localeCompare(b.title))
        ))
      }

    case 'SORT_BY_COMPLITED':
      return {
        ...state,
        direction: state.direction === 1 ? -1 : 1,
        todos: [...state.todos].sort((a, b) => (
          state.direction * (a.completed - b.completed)
        ))
      }

    default:
      return state;
  }
}

const store = createStore(reducer, initialState)

const App = () => (
  <Provider store={store}>
    <TodosList />
  </Provider>
)

export default App;
