import classNames from 'classnames';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';

export const TodoList = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handleSelectTodo = (todo: Todo) => {
    dispatch({ type: 'currentTodo/SET', payload: todo });
  };

  const filterTodos = useCallback(
    () => {
      const cleanQuery = filter?.query.trim().toLowerCase() || '';

      switch (filter?.status) {
        case 'active':
          return (todos)
            .filter(todo => !todo.completed
                && todo.title.toLowerCase().includes(cleanQuery));
        case 'completed':
          return (todos)
            .filter(todo => todo.completed
                && todo.title.toLowerCase().includes(cleanQuery));
        default:
          return (todos)
            .filter(todo => todo.title.toLowerCase().includes(cleanQuery));
      }

      return todos;
    },
    [filter, todos],
  );

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
        {filterTodos().map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames(
              { 'has-background-info-light': currentTodo?.id === todo.id },
            )}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed
                && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classNames(
                { 'has-text-success': todo.completed },
                { 'has-text-danger': !todo.completed },
              )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleSelectTodo(todo)}
              >
                <span className="icon">
                  <i className={classNames(
                    'far',
                    { 'fa-eye': currentTodo?.id !== todo.id },
                    { 'fa-eye-slash': currentTodo?.id === todo.id },
                  )}
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
