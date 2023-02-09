/* eslint-disable @typescript-eslint/no-shadow */
import { FC, useMemo } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { actions } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { FilterOptions } from '../../types/Filter';

export const TodoList: FC = () => {
  const todos = useAppSelector(state => state.todos);
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const handleOnClick = (clickedTodo: Todo) => {
    dispatch(actions.setTodo(clickedTodo));
  };

  const filterStatus = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  const filterTodos = (filter: string, query: string, todos: Todo[]) => {
    let filteredTodos = todos;

    switch (filter) {
      case FilterOptions.Active:
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case FilterOptions.Completed:
        filteredTodos = todos.filter(todo => todo.completed);
        break;

      case FilterOptions.All:
      default:
        break;
    }

    if (query) {
      filteredTodos = filteredTodos.filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filteredTodos;
  };

  const visibleTodos = useMemo(() => {
    return filterTodos(filterStatus, query, todos);
  }, [filterStatus, query]);

  return (
    <>
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>

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
            const { id, completed, title } = todo;

            return (
              <tr data-cy="todo" key={id}>
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
                    className={classNames('', {
                      'has-text-danger': !completed,
                      'has-text-success': completed,
                    })}
                  >
                    {title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleOnClick(todo)}
                  >
                    <span className={classNames('icon', {
                      'far fa-eye-slash': selectedTodo?.id === id,
                      'far fa-eye': selectedTodo?.id !== id,
                    })}
                    >
                      <i />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}

        </tbody>
      </table>
    </>
  );
};
