/* eslint-disable */
import React, { useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const todoList = useAppSelector(state => state.todos);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const filteredList = useMemo(() => {
    let newList = [...todoList];

    if (query) {
      newList = newList.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (status) {
      switch (status) {
        case 'active': {
          newList = newList.filter(todo => !todo.completed);

          break;
        }

        case 'completed': {
          newList = newList.filter(todo => todo.completed);

          break;
        }
      }
    }

    return newList;
  }, [todoList, query, status]);

  if (filteredList.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

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
        {filteredList.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </tbody>
    </table>
  );
};
