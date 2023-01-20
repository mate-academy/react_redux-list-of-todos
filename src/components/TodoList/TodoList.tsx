/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { getTodos } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';

type Props = {
  openModal: () => void;
  isOpen: boolean;
};

export const TodoList: React.FC<Props> = ({ openModal, isOpen }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const [isLoading, SetIsLoading] = useState(false);

  // prettier-ignore
  useEffect(() => {
    SetIsLoading(true);
    getTodos()
      .then((ts) => ts.map(t => dispatch({
        type: 'todo/SET',
        payload: t,
      })))
      .finally(() => SetIsLoading(false));
  }, []);

  const cleanQuery = query.trim().toLowerCase();

  const filteredTodos = todos
    .filter(todo => {
      if (status === 'completed') {
        return todo.completed;
      }

      if (status === 'active') {
        return !todo.completed;
      }

      return todo;
    })
    .filter(todo => todo.title.toLowerCase().includes(cleanQuery));

  if (isLoading) {
    return <Loader />;
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
            {filteredTodos.map(todo => (
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
                    className={cn({
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
                    onClick={() => {
                      openModal();
                      dispatch({
                        type: 'currentTodo/SET',
                        payload: todo,
                      });
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('far', {
                          'fa-eye': !isOpen,
                          'fa-eye-slash': isOpen,
                        })}
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
