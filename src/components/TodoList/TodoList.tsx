import { useMemo } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const status = useAppSelector((state) => state.filter.status);
  const query = useAppSelector((state) => state.filter.query);

  const compareInput = (
    title: string,
    inputValue: string,
  ) => title.includes(inputValue.toLowerCase());

  const visibleTodos = useMemo(() => {
    return todos.filter(({ completed, title }) => {
      switch (status) {
        case Status.ACTIVE:
          return !completed && compareInput(title, query);

        case Status.COMPLETED:
          return completed && compareInput(title, query);

        default:
          return compareInput(title, query);
      }
    });
  }, [todos, status, query]);

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
            className={classNames({
              'has-background-info-light': currentTodo?.id === todo.id,
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
                className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              {currentTodo?.id === todo.id ? (
                <button data-cy="selectButton" className="button" type="button">
                  <span className="icon">
                    <i className="far fa-eye-slash" />
                  </span>
                </button>
              ) : (
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => dispatch(currentTodoActions.setTodo(todo))}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
