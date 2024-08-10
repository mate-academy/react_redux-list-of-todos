/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { getDispayedTodos } from '../../utils/getDisplayedTodos';
import { TodoItem } from './TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const displayedTodos = getDispayedTodos(todos, filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const hasFilter = filter.query || filter.status !== 'all';
  const displayError = displayedTodos.length === 0 && hasFilter;

  return (
    <>
      {displayError ? (<p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>) :

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
            {displayedTodos.map((todo) => (
              <TodoItem todo={todo} selectedTodo={selectedTodo} />
            ))}
          </tbody>
        </table >
      }
    </>
  );
};
