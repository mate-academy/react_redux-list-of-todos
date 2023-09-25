/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { actions } from '../../features/currentTodo';

function getNormalisedTodos(todos: Todo[], query: string, filter: Status): Todo[] {
  let newTodos = todos;

  if (query.trim()) {
    const normalQuery = query.trim().toLowerCase();

    newTodos = todos.filter(
      todo => todo.title.toLowerCase().includes(normalQuery),
    );
  }

  switch (filter) {
    case Status.ACTIVE:
      return newTodos.filter(todo => !todo.completed);
    case Status.COMPLETED:
      return newTodos.filter(todo => todo.completed);
    default:
      return newTodos;
  }
}

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const preparedTodos = getNormalisedTodos(todos, query, status);
  const dispatch = useAppDispatch();

  const currentTodo = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

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
        </tr>
      </thead>

      <tbody>
        {preparedTodos.map(todo => (
          <tr data-cy="todo" className="">
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
                  currentTodo(todo);
                }}
              >
                <span className="icon">
                  <i className={cn('far', {
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
  );
};
