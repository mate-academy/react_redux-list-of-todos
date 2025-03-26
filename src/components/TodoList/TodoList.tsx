import { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { filterTodos } from '../../utils/filterTodos';
import { clearSelect, select } from '../../features/todos/todosSlice';

export const TodoList = () => {
  const dispatch = useAppDispatch();

  const { status, query } = useAppSelector(state => state.filter);
  const { todos, selected } = useAppSelector(state => state.todos);

  const todosToDisplay = useMemo(() => {
    return filterTodos(todos, status, query);
  }, [status, query, todos]);

  const handleSelect = (todo: Todo): void => {
    if (selected === null) {
      dispatch(select(todo));
    }

    if (todo.id === selected?.id) {
      dispatch(clearSelect());
    }
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
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todosToDisplay.map(todo => {
          const isSelected = selected !== null && todo.id === selected.id;

          return (
            <tr
              key={todo.id}
              data-cy="todo"
              className={classNames('', { 'has-background-info-light': false })}
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
                  className={classNames('', {
                    'has-text-danger': !todo.completed,
                    'has-text-success': todo.completed,
                  })}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  onClick={() => handleSelect(todo)}
                  data-cy="selectButton"
                  className="button"
                  type="button"
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye': !isSelected,
                        'fa-eye-slash': isSelected,
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
  );
};
