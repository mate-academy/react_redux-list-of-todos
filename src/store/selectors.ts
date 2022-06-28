/* eslint-disable max-len */
import { State } from '../react-app-env';

export enum OptionValue {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const getTodosSeclectors = (optionValue:OptionValue | string, query:string) => {
  return (state:State) => {
    switch (optionValue) {
      case OptionValue.All:
        return state.todos.filter(todo => (
          todo.title.includes(query)
        ));
      case OptionValue.Active:
        return state.todos.filter(todo => (
          todo.completed === false
          && todo.title.includes(query)
        ));
      case OptionValue.Completed:
        return state.todos.filter(todo => (
          todo.completed === true
          && todo.title.includes(query)
        ));
      default:
        return state.todos.filter(todo => (
          todo.title.includes(query)
        ));
    }
  };
};

export const getUserSelector = (state:State) => state.user;
