/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { setSelectedTodo } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  return (
    <>
      {todos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
              key={todo.id}
              data-cy="todo"
              className={cn(
                selectedTodo?.id === todo.id && 'has-background-info-light',
              )}
            >
              <td>{todo.id}</td>
              <td>
                {todo.completed && (
                  <i
                    className="fas fa-check has-text-success"
                    data-cy="iconCompleted"
                  />
                )}
              </td>
              <td
                className={cn(
                  todo.completed ? 'has-text-success' : 'has-text-danger',
                )}
              >
                {todo.title}
              </td>
              <td className="has-text-right">
                <button
                  className="button"
                  type="button"
                  data-cy="selectButton"
                  onClick={() => dispatch(setSelectedTodo(todo))}
                >
                  <span className="icon">
                    <i
                      className={
                        selectedTodo?.id === todo.id
                          ? 'far fa-eye-slash'
                          : 'far fa-eye'
                      }
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
