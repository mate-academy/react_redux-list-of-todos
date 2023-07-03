/* eslint-disable max-len */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[] | null;
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const selectTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <>
      {todos?.length === 0 && todos !== null ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )
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
              {
                todos?.map(todo => (
                  <tr
                    key={todo.id}
                    data-cy="todo"
                    className={todo.id === selectedTodo?.id
                      ? 'has-background-info-light'
                      : ''}
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
                      <p className={todo.completed ? 'has-text-success'
                        : 'has-text-danger'}
                      >
                        {todo.title}
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
                            todo.id !== selectedTodo?.id ? 'far fa-eye' : 'far fa-eye-slash'
                          }
                          />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )}
    </>
  );
};
