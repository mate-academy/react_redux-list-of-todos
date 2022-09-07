/* eslint-disable max-len */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { PREPARED_TODOS } from '../../features/todos';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const currTodoId = useSelector((state: RootState) => state.currentTodo);

  const todosPrepared = useSelector((state: RootState) => PREPARED_TODOS(state));

  const setSelectedTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodoId(todo.id));
  };

  return (
    todosPrepared && todosPrepared.length > 0
      ? (
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
            {todosPrepared.map(todo => (
              <tr
                data-cy="todo"
                className={currTodoId === todo.id
                  ? 'has-background-info-light'
                  : ''}
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
                    className={`has-text-${todo.completed ? 'success' : 'danger'}`}
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => setSelectedTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={`far fa-eye${currTodoId === todo.id
                          ? '-slash'
                          : ''}`}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )
  );
};
