import React, { useMemo } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

type Props = {
  error: string,
};

export const TodoList: React.FC<Props> = ({
  error,
}) => {
  const todos = useAppSelector(state => state.todos);
  const { query, status }
    = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const slashedEyeId = useAppSelector(state => state.currentTodo)?.id;

  const visibletodos = useMemo(() => {
    return todos.filter(({ title, completed }) => {
      if (query !== '' && (
        !title.toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())
      )) {
        return false;
      }

      switch (status) {
        case Status.Active:
          return !completed;
        case Status.Completed:
          return completed;
        default:
          return true;
      }
    });
  }, [todos, query, status]);

  const addCurrentTodo = ({
    id,
    completed,
    title,
    userId,
  }: Todo) => (
    dispatch({
      type: 'currentTodo/SET',
      payload: {
        id,
        completed,
        title,
        userId,
      },
    })
  );

  return (
    <>
      {error && (
        <p className="notification is-warning">
          {error}
        </p>
      )}

      {!todos.length
        ? <Loader />
        : (
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
              {visibletodos.map(({
                id,
                completed,
                title,
                userId,
              }) => (
                <tr key={id} data-cy="todo">
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
                      className={
                        completed
                          ? 'has-text-success'
                          : 'has-text-danger'
                      }
                    >
                      {title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => addCurrentTodo({
                        id,
                        completed,
                        title,
                        userId,
                      })}
                    >
                      <span className="icon">
                        <i className={cn(
                          'far',
                          { 'fa-eye-slash': id === slashedEyeId },
                          { 'fa-eye': id !== slashedEyeId },
                        )}
                        />
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
