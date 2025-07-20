import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleCompleted } from '../../features/todos';
import { selectTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos) as Todo[];
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  let visible: Todo[] =
    filter.status === 'all'
      ? todos
      : todos.filter(t => t.completed === (filter.status === 'completed'));

  if (filter.query.trim()) {
    const q = filter.query.toLowerCase();

    visible = visible.filter(t => t.title.toLowerCase().includes(q));
  }

  if (!visible.length) {
    return (
      <p className="notification is-warning" data-cy="noTodosMessage">
        There are no todos matching current filter criteria
      </p>
    );
  }

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
          <th />
        </tr>
      </thead>

      <tbody>
        {visible.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={
              currentTodo?.id === todo.id ? 'has-background-info-light' : ''
            }
          >
            <td className="is-vcentered">{todo.id}</td>

            <td
              className="is-vcentered"
              onClick={() => dispatch(toggleCompleted(todo.id))}
              style={{ cursor: 'pointer' }}
            >
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
                onClick={() =>
                  dispatch(
                    selectTodo(currentTodo?.id === todo.id ? null : todo),
                  )
                }
              >
                <span className="icon">
                  <i
                    className={
                      currentTodo?.id === todo.id
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
  );
};
