/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/store';
import { getFilteredTodos } from '../../utils/selectors';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const filteredTodos = useAppSelector(getFilteredTodos);
  const currentTodoId = useAppSelector(state => state.currentTodo)?.id;
  const dispatch = useDispatch();

  return (
    <>
      {filteredTodos.length === 0 ? (
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
                className={cn({
                  'has-background-info-light': currentTodoId === todo.id,
                })}
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
                      dispatch(currentTodoSlice.actions.set(todo));
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('far', {
                          'fa-eye': currentTodoId !== todo.id,
                          'fa-eye-slash': currentTodoId === todo.id,
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
