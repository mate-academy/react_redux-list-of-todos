/* eslint-disable max-len */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);

  const prepareTodos = () => {
    let preparedTodos = [] as Todo[];

    switch (status) {
      case 'all':
      default:
        preparedTodos = [...todos];
        break;
      case 'active':
        preparedTodos = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        preparedTodos = todos.filter(todo => todo.completed);
        break;
    }

    if (query) {
      return preparedTodos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    return preparedTodos;
  };

  const filteredTodos = prepareTodos();

  return (
    <>
      {filteredTodos.length === 0
        ? (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        ) : (
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
              {filteredTodos.map(todo => (
                <TodoItem
                  item={todo}
                  key={todo.id}
                />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
