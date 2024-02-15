/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const filtredTodos = () => {
    switch (filter.status) {
      case 'all':
        return todos;

      case 'active':
        return todos?.filter(todo => todo.completed === false);

      case 'completed':
        return todos?.filter(todo => todo.completed === true);

      default:
        return todos;
    }
  };

  const queryFilter = (todoList: Todo[]) => {
    return todoList?.filter(todo => todo.title.toLowerCase().includes(filter.query.toLowerCase().trim()));
  };

  const preparedTodos = queryFilter(filtredTodos());

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
        {preparedTodos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames(
              { 'has-background-info-light': todo.id === currentTodo?.id },
            )}
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
              <p className={classNames(
                {
                  'has-text-danger': todo.completed === false,
                  'has-text-success': todo.completed === true,
                },
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
                onClick={() => dispatch(actions.setTodo(todo))}
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye-slash': todo.id === currentTodo?.id,
                    'fa-eye': todo.id !== currentTodo?.id,
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
