/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import cn from 'classnames';
import { currentTodoSlice } from '../../features/currentTodo';
import { getFilteredTodos } from '../../utils/GetFilteredTodos';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);
  const filteredTodos = getFilteredTodos(todos, filter);
  const hasTodo = todos.length;

  return (
    <>
      {!hasTodo && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
      {hasTodo && (
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
                  'has-background-info-light': todo.id === selectedTodo?.id
                })}
                key={todo.id}
              >
                <td className="is-vcentered">{todo.id}</td>
                {todo.completed ? (
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                ) : (
                  <td className="is-vcentered" />
                )}
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
                      dispatch(currentTodoSlice.actions.setTodo(todo));
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('far', {
                          'fa-eye-slash': selectedTodo?.id === todo.id,
                          'fa-eye': selectedTodo?.id !== todo.id,
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
