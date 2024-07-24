import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { add } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentItem = useAppSelector(state => state.currentTodo);
  const select = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  const filteredTodos = todos.filter(todo => {
    const matchesStatus = select.status === 'all' ||
      (select.status === 'active' && !todo.completed) ||
      (select.status === 'completed' && todo.completed);
    const matchesQuery = todo.title.toLowerCase().includes(select.query.toLowerCase());

    return matchesStatus && matchesQuery;
  });

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
              'has-background-info-light': currentItem?.id === todo.id,
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
                className={cn(
                  { 'has-text-danger': !todo.completed },
                  { 'has-text-success': todo.completed },
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
                onClick={() => dispatch(add(todo))}
              >
                <span className="icon">
                  <i
                    className={cn(
                      'far',
                      { 'fa-eye-slash': currentItem?.id === todo.id },
                      { 'fa-eye': currentItem?.id !== todo.id },
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
