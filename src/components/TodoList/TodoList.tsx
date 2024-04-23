/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.currentFilter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatchTodo = useDispatch();
  const handleChooseTodo = (choosenTodo: Todo) => {
    dispatchTodo(actions.setTodo(choosenTodo));
  };

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLocaleLowerCase().includes(filter.query.toLocaleLowerCase());

    switch (filter.status) {
      case 'all':
        return todo && matchesQuery;
      case 'active':
        return todo.completed && matchesQuery;
      case 'completed':
        return !todo.completed && matchesQuery;
      default:
        return matchesQuery;
    }
  });

  return (
    <>
      {visibleTodos.length === 0
      && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
              className={cn({
                'has-background-info-light': todo === currentTodo,
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
                <p className={cn({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                })}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button" onClick={() => handleChooseTodo(todo)}>
                  <span className="icon">
                    <i className={cn({
                      'far fa-eye': !currentTodo || todo !== currentTodo,
                      'far fa-eye-slash': todo === currentTodo,
                    })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
