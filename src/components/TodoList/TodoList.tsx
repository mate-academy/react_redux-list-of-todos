/* eslint-disable */
//#region imports
import React from 'react';
import { useDispatch } from 'react-redux';
import { getVisibleTodos } from '../../utils/getVisibleTodos';
import { currentTodoSlice } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks';
import cn from 'classnames';
//#endregion

export const TodoList: React.FC = () => {
  const { todos } = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const visibleTodos = getVisibleTodos(todos, status, query);

  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  return (
    <>
      {visibleTodos.length === 0 ? (
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
            {visibleTodos.map((todo, i) => (
              <tr data-cy="todo" key={`${i}-${todo.title}`}>
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
                    onClick={() => {
                      dispatch(currentTodoSlice.actions.set(todo));
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('far', {
                          'fa-eye': currentTodo?.id !== todo.id,
                          'fa-eye-slash': currentTodo?.id === todo.id,
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
