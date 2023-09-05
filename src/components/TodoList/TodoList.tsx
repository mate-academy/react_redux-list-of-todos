import { useMemo } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const statusFilter = filter.status === Status.all
        || (filter.status === Status.completed
          ? todo.completed : !todo.completed);

      const queryMatches = todo.title.trim()
        .toLowerCase()
        .includes(
          filter.query
            .toLowerCase(),
        );

      return statusFilter && queryMatches;
    });
  }, [todos, filter.status, filter.query]);

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
        {filteredTodos.map(todo => {
          const {
            id,
            title,
            completed,
          } = todo;
          const isSelected = currentTodo?.id === id;

          return (
            <tr
              data-cy="todo"
              className={cn({
                'has-background-info-light': isSelected,
              })}
              key={id}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={
                    cn({
                      'has-text-success': completed,
                      'has-text-danger': !completed,
                    })
                  }
                >
                  {title}
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
                    <i
                      className={
                        cn(
                          'far',
                          {
                            'fa-eye': !(isSelected),
                            'fa-eye-slash': isSelected,
                          },
                        )
                      }
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
