/* eslint-disable max-len */
import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const list = useAppSelector(state => state.todos);
  const currentTodoId = useAppSelector(state => state.currentTodo?.id);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const setTodoActive = (todo: Todo) => dispatch(actions.setTodo(todo));

  const filterData = (data: Todo[], search: string, searchStatus: Status) => {
    if (search === '' && searchStatus === 'all') {
      return data;
    }

    return data.filter(el => {
      const isActive = searchStatus === Status.Active;
      const isCompleted = searchStatus === Status.Completed;

      return (
        searchStatus === Status.All
        || (!el.completed && isActive)
        || (el.completed && isCompleted)
      ) && el.title.toLowerCase().includes(search.toLowerCase());
    });
  };

  const visibleData = useMemo(
    () => filterData(list, query, status),
    [list, query, status],
  );

  const isListEmpty = useMemo(
    () => !visibleData.length && !!list.length,
    [list, query, status],
  );

  return (
    <>
      {isListEmpty && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!!visibleData.length && (
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
            {visibleData.map((todo) => {
              const {
                id,
                title,
                completed,
              } = todo;

              return (
                <tr
                  data-cy="todo"
                  key={id}
                  className={classNames({ 'has-background-info-light': currentTodoId === id })}
                >
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {completed && <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p className={completed ? 'has-text-success' : 'has-text-danger'}>{title}</p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => setTodoActive(todo)}
                    >
                      <span className="icon">
                        {
                          currentTodoId !== id
                            ? <i className="far fa-eye" />
                            : <i className="far fa-eye-slash" />
                        }
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
