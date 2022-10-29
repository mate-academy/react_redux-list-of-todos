import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Filter } from '../../types/Filter';

import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const currentQuery: string = useAppSelector<string>(state => (
    state.filter.query
  ));
  const currentStatus: string = useAppSelector<string>(state => (
    state.filter.status
  ));
  const allTodos: Todo[] | [] = useAppSelector<Todo[] | []>(state => (
    state.todos
  ));

  const todosByQuery = allTodos.filter(todo => (
    todo.title.includes(currentQuery.toLowerCase())
  ));

  const filterList = (filterProp: string) => {
    switch (filterProp) {
      case Filter.all:
        return todosByQuery.filter(todo => todo.completed || !todo.completed);

      case Filter.completed:
        return todosByQuery.filter(todo => todo.completed);

      case Filter.active:
        return todosByQuery.filter(todo => !todo.completed);

      default:
        return todosByQuery;
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
        {filterList(currentStatus).map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </tbody>
    </table>
  );
};
