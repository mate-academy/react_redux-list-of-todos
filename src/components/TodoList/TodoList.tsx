/* eslint-disable max-len */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { Loader } from '../Loader';

type Props = {
  error: string,
};

export const TodoList: React.FC<Props> = ({
  error,
}) => {
  const todos = useAppSelector(state => state.todos);
  const { searchedTitle, selectedStatus } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const visibletodos = todos.filter(({ title, completed }) => {
    if (searchedTitle !== '' && (
      !title.toLocaleLowerCase()
        .includes(searchedTitle.toLocaleLowerCase())
    )) {
      return false;
    }

    switch (selectedStatus) {
      case Status.active:
        return !completed;
      case Status.completed:
        return completed;
      default:
        return true;
    }
  });

  return (
    <>
      {error && (
        <p className="notification is-warning">
          {error}
        </p>
      )}

      {!todos.length && <Loader />}

      {!!todos.length && (
        <>
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
              {visibletodos.map((todo) => (
                <tr key={todo.id} data-cy="todo">
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
                      className={
                        todo.completed
                          ? 'has-text-success'
                          : 'has-text-danger'
                      }
                    >
                      {todo.title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch({ type: 'currentTodo/SET', payload: todo })}
                    >
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
