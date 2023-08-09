/* eslint-disable max-len */
import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);
  const filter = useAppSelector((state) => state.filter);

  const currentTodo = useAppSelector((state) => state.currentTodo);

  const filteredTodos: Todo[] | undefined = useMemo(() => {
    const newArray = todos?.filter((todo) => {
      const lowerCase = todo.title.toLowerCase();
      const filterLowerCase = filter.query?.toLowerCase() || '';

      switch (filter.status) {
        case 'active':
          return !todo.completed && lowerCase.includes(filterLowerCase);
        case 'completed':
          return todo.completed && lowerCase.includes(filterLowerCase);
        default:
          return true && lowerCase.includes(filterLowerCase);
      }
    });

    return newArray;
  }, [filter]);

  return (
    <>
      {filteredTodos?.length !== 0 ? (
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
            {filteredTodos?.map((todo) => {
              const { id, title, completed } = todo;

              const isActive = () => id === currentTodo?.id;

              return (
                <tr
                  data-cy="todo"
                  key={id}
                  className={classNames({
                    'className="has-background-info-light': isActive(),
                  })}
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
                      className={classNames('has-text-success', {
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
                      onClick={() => {
                        dispatch(actions.setTodo(todo));
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            'far',
                            { 'fa-eye-slash': isActive() },
                            { 'fa-eye': !isActive() },
                          )}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
