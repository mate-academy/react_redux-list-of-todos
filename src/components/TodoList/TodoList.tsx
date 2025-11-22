/* eslint-disable */
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useCallback, useEffect } from 'react';
import { FilterState } from '../../types/FilterState';
import { setFilterNotif } from '../../features/filter';
import { UseAppSelector } from '../../hooks';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const noMatchingTodoNotif =
    'There are no todos matching current filter criteria';
  const filter = UseAppSelector((state: RootState) => state.filter);
  const { todos, notif } = UseAppSelector((state: RootState) => state.todos);
  const { currentTodo } = UseAppSelector(
    (state: RootState) => state.currentTodo,
  );
  const dispatch = useDispatch<AppDispatch>();

  const getFilteredTodos = useCallback(
    (filter: FilterState) => {
      let filteredList = [...todos];

      switch (filter.status) {
        case 'active':
          filteredList = filteredList.filter(todo => !todo.completed);
          break;

        case 'completed':
          filteredList = filteredList.filter(todo => todo.completed);
          break;

        default:
          filteredList;
          break;
      }

      filteredList = filteredList.filter(todo =>
        todo.title.toLowerCase().includes(filter.query.toLowerCase()),
      );

      return filteredList;
    },
    [filter, todos],
  );

  const filteredTodos: Todo[] = getFilteredTodos(filter);

  useEffect(() => {
    const newNotif =
      filteredTodos.length === 0 && filter.query.length > 0
        ? noMatchingTodoNotif
        : '';

    if (filter.notif !== newNotif) {
      dispatch(setFilterNotif(newNotif));
    }
  }, [filteredTodos, filter.query, filter.notif]);

  return (
    <>
      {notif.length > 0 ? (
        <span>{notif}</span>
      ) : (
        <>
          {filter.notif.length > 0 && (
            <p className="notification is-warning">{filter.notif}</p>
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
              {filteredTodos.map(todo => (
                <tr
                  data-cy="todo"
                  key={todo.id}
                  className={classNames({
                    'has-background-info-light': todo.id === currentTodo?.id,
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
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() =>
                        dispatch(
                          setCurrentTodo(todos.find(t => t.id === todo.id)),
                        )
                      }
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
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
        </>
      )}
    </>
  );
};
