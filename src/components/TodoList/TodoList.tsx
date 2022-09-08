/* eslint-disable max-len */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CURRENT_TODO_ID_ACTIONS_CREATOR } from '../../features/currentTodoId';
import { SELECTORS } from '../../features/Selectors';
import { TodoModal } from '../TodoModal';

export const TodoList: React.FC = () => {
  const filteredTodos = useAppSelector(SELECTORS.filteredTodos);
  const currentTodoId = useAppSelector(SELECTORS.currentTodoId);
  const dispatch = useAppDispatch();

  return (
    <>
      {filteredTodos.length < 1 ? (
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
              <tr
                data-cy="todo"
                key={todo.id}
                className={todo.id === currentTodoId ? 'has-background-info-light' : ''}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p className={`has-text-${todo.completed ? 'success' : 'danger'}`}>
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => dispatch(CURRENT_TODO_ID_ACTIONS_CREATOR.set(todo.id))}
                  >
                    <span className="icon">
                      <i className={`far fa-eye${todo.id === currentTodoId ? '-slash' : ''}`} />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {currentTodoId && <TodoModal />}
    </>
  );
};
