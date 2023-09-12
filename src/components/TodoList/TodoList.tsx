import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoAction } from '../../features/currentTodo';
// eslint-disable-next-line max-len
import { todosFilterdByQuery, todosFilteredByStatus } from '../../helpers/helpers';

export const TodoList: React.FC = () => {
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [visibleTodos, setVisibleTodos] = useState(todos);

  useEffect(() => {
    let filteredTodos = todosFilteredByStatus(todos, status);

    filteredTodos = todosFilterdByQuery(filteredTodos, query);
    setVisibleTodos(filteredTodos);
  }, [todos, status, query]);

  return (
    <>
      {!visibleTodos.length ? (
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
            {visibleTodos.map(todo => {
              const { id, completed, title } = todo;

              return (
                <tr
                  data-cy="todo"
                  className={cn({
                    'has-background-info-light': currentTodo?.id === id,
                  })}
                  key={id}
                >
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}

                  </td>
                  <td className="is-vcentered is-expanded">
                    <p
                      className={cn({
                        'has-text-success': completed,
                        'has-text-danger': !completed,
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
                      onClick={() => dispatch(currentTodoAction.setTodo(todo))}
                    >
                      <span className="icon">
                        <i
                          className={cn({
                            'far fa-eye': currentTodo?.id !== id,
                            'far fa-eye-slash': currentTodo?.id,
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
