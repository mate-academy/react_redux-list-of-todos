import { useSignals } from '@preact/signals-react/runtime';
import { computed } from '@preact/signals-react';
import classNames from 'classnames';
import { filterValue, searchQuery, selectedTodo, todos } from '../../signals';
import { FilterValues } from '../../types';

const filteredTodos = computed(() => {
  return todos.value
    .filter(todo => {
      switch (filterValue.value) {
        default:
        case FilterValues.all:
          return todo;
        case FilterValues.completed:
          return todo.completed;
        case FilterValues.active:
          return !todo.completed;
      }
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
});

export const TodoList: React.FC = () => {
  useSignals();

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th aria-label="icon">
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th aria-label="empty header"> </th>
        </tr>
      </thead>

      <tbody>
        {filteredTodos.value.map(todo => (
          <tr
            data-cy="todo"
            className={classNames({
              'has-background-info-light': selectedTodo.value,
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
                className={classNames(
                  `has-text-${todo.completed ? 'success' : 'danger'}`,
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
                aria-label="Select todo"
                onClick={() => {
                  selectedTodo.value = todo;
                }}
              >
                <span className="icon">
                  <i
                    className={classNames(
                      'far',
                      `fa-eye${todo.id === selectedTodo.value?.id ? '-slash' : ''}`,
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
