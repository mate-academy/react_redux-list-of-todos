import { FC, useMemo } from 'react';
import cn from 'classnames';
import { actions as TodoActions } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

type Props = {
  todos: Todo[];
  currentTodo: Todo | null;
};

const compareId = (id: number, currentId: number): boolean => id === currentId;

export const TodoList: FC<Props> = ({ todos, currentTodo }) => {
  const dispatch = useAppDispatch();
  const filterState = useAppSelector(state => state.filter);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const titleLow = todo.title.toLowerCase();
      const queryLow = filterState.query.toLowerCase();
      const { completed } = todo;

      switch (filterState.status) {
        case Status.ALL:
          return titleLow.includes(queryLow);
        case Status.ACTIVE:
          return !completed && titleLow.includes(queryLow);
        case Status.COMPLETED:
          return completed && titleLow.includes(queryLow);
        default:
          return todo;
      }
    });
  }, [filterState, todos]);

  const handleSelect = (todo: Todo) => dispatch(TodoActions.setTodo(todo));
  const currentId = currentTodo ? currentTodo.id : 0;

  return (
    <>
      {!visibleTodos.length ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
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
            {visibleTodos.map(todo => {
              const { id, title, completed } = todo;

              return (
                <tr
                  data-cy="todo"
                  className={cn({
                    'has-background-info-light': compareId(id, currentId),
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
                      className={cn({
                        'has-text-success': completed,
                        'has-text-danger': !completed,
                      })}
                    >
                      {title}
                    </p>
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      aria-label="Select todo button"
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => handleSelect(todo)}
                    >
                      <span className="icon">
                        <i className={cn('far', {
                          'fa-eye': !compareId(id, currentId),
                          'fa-eye-slash': compareId(id, currentId),
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
      )}
    </>
  );
};
