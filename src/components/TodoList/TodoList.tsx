/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);

  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);

  const { query, status } = filter;

  const [visiblesTodos, setVisiblesTodos] = useState(todos);

  const selectTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  useEffect(() => {
    const filteredTodos = todos
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
      .filter(todo => {
        switch (status) {
          case Status.active:
            return !todo.completed;

          case Status.completed:
            return todo.completed;

          default:
            return todo;
        }
      });

    setVisiblesTodos(filteredTodos);
  }, [status, query]);

  return (
    <>
      {(visiblesTodos.length === 0 && (status.length > 0 || query !== Status.all)) ? (
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
            {visiblesTodos.map(todo => {
              const { id, title, completed } = todo;

              return (
                <tr
                  data-cy="todo"
                  className={(currentTodo && id === currentTodo.id)
                    ? 'has-background-info-light'
                    : ''}
                  key={id}
                >
                  <td className="is-vcentered">{id}</td>
                  {completed ? (
                    <td className="is-vcentered">
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    </td>
                  ) : (
                    <td className="is-vcentered" />
                  )}

                  <td className="is-vcentered is-expanded">
                    <p className={completed
                      ? 'has-text-success'
                      : 'has-text-danger'}
                    >
                      {title}
                    </p>
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => selectTodo(todo)}
                    >
                      <span className="icon">
                        <i className={
                          (currentTodo && id !== currentTodo.id) || !currentTodo
                            ? 'far fa-eye'
                            : 'far fa-eye-slash'
                        }
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
