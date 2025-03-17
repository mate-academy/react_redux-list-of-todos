/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  loading: boolean;
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ loading, todos }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const handleSetCurrentTodo = (id: number) => {
    const todo = todos.find(item => item.id === id);

    if (todo) {
      dispatch(currentTodoSlice.actions.setCurrentTodo(todo));
    }
  };

  return (
    <>
      {!todos.length && !loading && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!!todos.length && !loading && (
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
            {todos.map(({ id, completed, title }) => (
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
                    className={
                      completed ? 'has-text-success' : 'has-text-danger'
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
                    onClick={() => handleSetCurrentTodo(id)}
                  >
                    <span className="icon">
                      <i
                        className={cn('far', {
                          'fa-eye-slash': currentTodo?.id === id,
                          'fa-eye': currentTodo?.id !== id,
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
