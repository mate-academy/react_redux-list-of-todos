/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoAction } from '../../features/currentTodo';
import { filterTodos } from '../../app/filterTodos';
import cn from 'classnames';

export const TodoList: React.FC = () => {
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const selectTodo = (selectedTodo: Todo) =>
    dispatch(currentTodoAction.setTodo(selectedTodo));
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  const filteredTodos = filterTodos(todos, filter);

  return !filteredTodos.length ? (
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
        {filteredTodos?.map(todo => (
          <tr data-cy="todo" key={todo.id}>
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              <i className={cn('', { 'fas fa-check': todo.completed })} />
            </td>

            <td className="is-vcentered is-expanded">
              <p
                className={cn('', {
                  'has-text-success': todo.completed,
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
                onClick={() => selectTodo(todo)}
              >
                <span
                  className="icon"
                  data-cy={cn('', { iconCompleted: todo.completed })}
                >
                  <i
                    className={cn('far', {
                      'fa-eye-slash': currentTodo?.id === todo.id,
                      'fa-eye': currentTodo?.id !== todo.id,
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
