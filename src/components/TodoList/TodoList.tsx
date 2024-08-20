/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  loading: boolean;
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ loading, todos }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const handleSetCurrentTodo = (todo: Todo) =>
    dispatch(currentTodoSlice.actions.setCurrentTodo(todo));

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
            {todos.map(todo => (
              <tr
                data-cy="todo"
                className={
                  currentTodo === todo ? 'has-background-info-light' : ''
                }
                key={todo.id}
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
                  <p
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
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
                    onClick={() => handleSetCurrentTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={`far ${currentTodo === todo ? 'fa-eye-slash' : 'fa-eye'}`}
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
