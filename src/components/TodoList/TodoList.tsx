/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as todosActions } from '../../features/todos';
import { getTodos } from '../../api';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { filterTodos } from '../../utils';
import { Loader } from '../Loader';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { todos } = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);

  const filteredTodos = filterTodos(todos, status, query);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosFromServer = await getTodos();

        dispatch(todosActions.setTodos(todosFromServer));
        setIsLoading(false);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <p className="notification is-danger">
        Opppsss server error
      </p>
    );
  }

  return (
    <>
      {!filteredTodos.length ? (
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
            {filteredTodos.map(todo => {
              const { id, title, completed } = todo;
              const isTodoSelected = selectedTodo?.id === id;

              return (
                <tr
                  data-cy="todo"
                  className={classNames({
                    'has-background-info-light': isTodoSelected,
                  })}
                  key={id}
                >
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {completed && (
                      <span
                        className="icon"
                        data-cy="iconCompleted"
                      >
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>
                  <td className="is-vcentered is-expanded">
                    <p className={classNames({
                      'has-text-danger': !completed,
                      'has-text-success': completed,
                    })}
                    >
                      {title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch(currentTodoActions.setTodo(todo))}
                    >
                      <span className="icon">
                        <i className={classNames({
                          'far fa-eye-slash': isTodoSelected,
                          'far fa-eye': !isTodoSelected,
                        })}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
