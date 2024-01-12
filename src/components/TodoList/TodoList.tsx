/* eslint-disable max-len */
import cn from 'classnames';
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoAction } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const preparedList = useMemo(() => {
    let newList: Todo[] = [...todos];

    if (query) {
      newList = newList.filter((todo: Todo) => {
        return todo
          .title
          .toLowerCase()
          .includes(query.toLowerCase());
      });
    }

    if (status === 'completed') {
      return newList.filter((todo: Todo) => todo.completed);
    }

    if (status === 'active') {
      return newList.filter((todo: Todo) => !todo.completed);
    }

    return newList;
  }, [query, status]);

  const chooseTodo = (todo: Todo) => dispatch(currentTodoAction.setTodo(todo));

  return (
    <>
      {preparedList.length === 0 ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th>
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>

              <th>Title</th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {preparedList.map(todo => (
              <tr
                key={todo.id}
                data-cy="todo"
                className={cn({
                  'has-background-info-light': currentTodo?.id === todo.id,
                })}
              >
                <td className="is-vcentered">{todo.id}</td>

                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p className={cn({
                    'has-text-danger': !todo.completed,
                    'has-text-success': todo.completed,
                  })}
                  >
                    {todo.title}
                  </p>
                </td>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <td className="has-text-right is-vcentered">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => chooseTodo(todo)}
                  >
                    <span className="icon">
                      {currentTodo?.id === todo.id ? (
                        <i className="far fa-eye-slash" />
                      ) : (
                        <i className="far fa-eye" />
                      )}
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
