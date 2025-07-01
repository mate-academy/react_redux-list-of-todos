/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { setCurrentTodo } from '../../features/currentTodo';
import cn from 'classnames';
import { getVisibleTodos } from '../../utils/getVisibleTodos';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const visibleTodos = getVisibleTodos(todos, status, query);

  return (
    <>
      {!visibleTodos.length ? (
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
            {visibleTodos.map(todo => {
              const isTodoSelected = currentTodo?.id === todo.id;
              const isTodoCompleted = todo.completed === true;

              return (
                <tr
                  key={todo.id}
                  data-cy="todo"
                  className={cn({
                    'has-background-info-light': isTodoSelected,
                  })}
                >
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered">
                    {isTodoCompleted && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check"></i>
                      </span>
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p
                      className={
                        isTodoCompleted ? 'has-text-success' : 'has-text-danger'
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
                      onClick={() => dispatch(setCurrentTodo(todo))}
                    >
                      <span className="icon">
                        <i
                          className={cn('far', {
                            'fa-eye': !isTodoSelected,
                            'fa-eye-slash': isTodoSelected,
                          })}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
