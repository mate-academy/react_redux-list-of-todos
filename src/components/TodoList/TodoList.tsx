import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { currentTodoSlice } from '../../features/currentTodo';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const setSelectedTodo = (todo: Todo) =>
    dispatch(currentTodoSlice.actions.setSelectedTodo(todo));

  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => {
        switch (status) {
          case Status.completed:
            return todo.completed;

          case Status.active:
            return !todo.completed;

          default:
            return true;
        }
      })
      .filter(todo =>
        todo.title.toLowerCase().trim().includes(query.trim().toLowerCase()),
      );
  }, [query, todos, status]);

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
        {filteredTodos.map(todo => (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': selectedTodo?.id === todo.id,
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
                className={cn('has-text-success', {
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
                onClick={() => setSelectedTodo(todo)}
              >
                <span className="icon">
                  {selectedTodo?.id === todo.id ? (
                    <i className="far fa-eye-slash" />
                  ) : (
                    <i className="far fa-eye" />
                  )}
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
