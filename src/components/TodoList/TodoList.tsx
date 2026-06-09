/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import classNames from 'classnames';
import { currentTodoSlice } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  isTodosLoaded: boolean;
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ isTodosLoaded, todos }) => {
  const dispatch = useDispatch();

  function handleSelect(todoId: number) {
    const todo = todos.find(t => t.id === todoId);

    if (todo && todo !== currentTodo) {
      dispatch(currentTodoSlice.actions.setCurrentTodo(todo));
    } else {
      dispatch(currentTodoSlice.actions.clearCurrentTodo());
    }
  }

  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  return (
    !isTodosLoaded && (
      <>
        {todos.length < 1 && (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )}

        <table className="table is-narrow is-fullwidth">
          {todos.length > 0 && (
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
          )}

          <tbody>
            {todos.map(todo => {
              return (
                <tr
                  data-cy="todo"
                  className={classNames({
                    'has-background-info-light': todo.id === currentTodo?.id,
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
                      className={classNames({
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
                      onClick={() => handleSelect(todo.id)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('far ', {
                            'fa-eye': todo.id !== currentTodo?.id,
                            'fa-eye-slash': todo.id === currentTodo?.id,
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
      </>
    )
  );
};
