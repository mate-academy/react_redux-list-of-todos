/* eslint-disable */
import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getVisibleTodos } from '../../utils/getFilteredTodos';
import { selectTodos } from '../../features/todos';
import { selectFilter } from '../../features/filter';
import cn from 'classnames';
import { selectCurrentTodo, setCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: FC = () => {
  const todos = useAppSelector(selectTodos);
  const { query, status } = useAppSelector(selectFilter);

  const currentTodo = useAppSelector(selectCurrentTodo);
  const dispatch = useAppDispatch();

  const handleSetCurrentTodo = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
  };

  const visibleTodos = getVisibleTodos(todos, status, query);

  return (
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
        {visibleTodos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={cn({
              'has-background-info-light':
              currentTodo && currentTodo.id === todo.id,
            })}
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
                  'has-text-succes': todo.completed,
                  'has-text-danger': !todo.completed,
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
                onClick={() => handleSetCurrentTodo(todo)}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye':
                        !currentTodo ||
                        (currentTodo && currentTodo.id !== todo.id),
                      'fa-eye-slash': currentTodo && currentTodo.id === todo.id,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
