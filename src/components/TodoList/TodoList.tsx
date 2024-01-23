/* eslint-disable max-len */
import classNames from 'classnames';
import React from 'react';
import { filterTodos } from '../../services/getFilteredTodos';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoAction } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  isLoading: boolean,
};

export const TodoList: React.FC<Props> = ({
  isLoading,
}) => {
  const dispatch = useAppDispatch();

  const setSelectedTodo = (currentTodo: Todo) => {
    dispatch(currentTodoAction.setTodo(currentTodo));
  };

  const { query, status } = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const filteredTodos = filterTodos(todos, query, status);

  return (
    <>
      {!filteredTodos.length && !isLoading && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th aria-label="column status todo">
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th aria-label="column open todo"> </th>
          </tr>
        </thead>

        <tbody>
          {filteredTodos.map(todo => (
            <tr
              key={todo.id}
              data-cy="todo"
              className={classNames({
                'has-background-info-light': selectedTodo === todo,
              })}
            >
              <td className="is-vcentered">{todo.id}</td>

              <td className="is-vcentered">
                {todo.completed && (
                  <span
                    className="icon"
                    data-cy="iconCompleted"
                    aria-label="todo completed"
                  >
                    <i className="fas fa-check" />
                  </span>
                )}

              </td>

              <td className="is-vcentered is-expanded">
                <p className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  aria-label="open todo's window"
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setSelectedTodo(todo)}
                >
                  <span className="icon">
                    <i className={classNames(
                      {
                        'far fa-eye-slash': selectedTodo === todo,
                        'far fa-eye': selectedTodo !== todo,
                      },
                    )}
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
