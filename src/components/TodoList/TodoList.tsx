import React from 'react';
import { TodoElement } from '../Todo/TodoElement';
import { useAppSelector } from '../../app/hooks';
import { Filter } from '../../types/Filter';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filterType = useAppSelector(state => state.filter.filterType);
  const filterQuery = useAppSelector(state => state.filter.filterQuery);

  const filteredTodo = todos.filter((todo) => {
    return todo.title.toLowerCase().includes(filterQuery.toLowerCase());
  })
    .filter(todo => {
      if (filterType === Filter.Active) {
        return !todo.completed;
      }

      if (filterType === Filter.Completed) {
        return todo.completed;
      }

      return true;
    });

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
        {filteredTodo.map(todo => {
          return (
            <TodoElement key={todo.id} theTodo={todo} />
          );
        })}
      </tbody>
    </table>
  );
};
