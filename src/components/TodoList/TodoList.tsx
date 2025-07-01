/* eslint-disable */
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/store';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const getFilteredTodos = (
    todos: Todo[],
    query: string,
    status: Status,
  ) => {
    return todos.filter(td => {
      const normalizedQuery = query.trim().toLowerCase();
      const ifIncludesQuery = td.title.toLowerCase().includes(normalizedQuery);

        switch (status) {
        case 'active':
          return ifIncludesQuery && !td.completed;

        case 'completed':
          return ifIncludesQuery && td.completed;

        case 'all':
        default:
          return ifIncludesQuery;
      }
    });
  }

  const filteredTodos = getFilteredTodos(todos, query, status as Status);

 return (
    <>
      {todos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
            <tr data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={classNames({
                    'has-text-danger': !todo.completed,
                    'has-text-success': todo.completed,
                  })}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => dispatch(setCurrentTodo(todo))}
                >
                  <span className="icon">
                    <i
                      className={`far ${currentTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
