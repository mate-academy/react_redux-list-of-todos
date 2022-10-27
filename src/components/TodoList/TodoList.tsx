import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Filter } from '../../types/Filter';

import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const currentQuery: string = useSelector<RootState, string>(state => (
    state.filter.query
  ));
  const currentStatus: string = useSelector<RootState, string>(state => (
    state.filter.status
  ));
  const allTodos: Todo[] | [] = useSelector<RootState, Todo[] | []>(state => (
    state.todos
  ));

  const filterList = (filterProp: string, todosList: Todo[]) => {
    switch (filterProp) {
      case Filter.all:
        return todosList.filter(todo => (todo.completed || !todo.completed)
          && todo.title.includes(currentQuery.toLowerCase()));

      case Filter.completed:
        return todosList.filter(todo => todo.completed
          && todo.title.includes(currentQuery.toLowerCase()));

      case Filter.active:
        return todosList.filter(todo => !todo.completed
          && todo.title.includes(currentQuery.toLowerCase()));

      default:
        return todosList;
    }
  };

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {filterList(currentStatus, allTodos).map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </tbody>
    </table>
  );
};
