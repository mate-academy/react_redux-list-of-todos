import { useDispatch, useSelector } from 'react-redux';
import { Todo } from '../../types/Todo';
import { RootState } from '../../app/store';
import { useMemo } from 'react';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList = () => {
  const dispatch = useDispatch();
  const allTodos: Todo[] = useSelector((state: RootState) => state.todos);
  const filterType = useSelector((state: RootState) => state.filter.status);
  const searchQuery = useSelector((state: RootState) => state.filter.query);
  const pick = useSelector((state: RootState) => state.currentTodo);

  const filteredTodos = useMemo(() => {
    return allTodos
      .filter(todo => {
        if (filterType === 'completed') {
          return todo.completed;
        }

        if (filterType === 'active') {
          return !todo.completed;
        }

        return true;
      })
      .filter(todo => {
        if (!searchQuery) {
          return true;
        }

        return todo.title.toLowerCase().includes(searchQuery.toLowerCase());
      });
  }, [allTodos, filterType, searchQuery]);

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
          <th></th>
        </tr>
      </thead>

      <tbody>
        {filteredTodos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={pick?.id === todo.id ? 'has-background-info-light' : ''}
          >
            <td className="is-vcentered">{todo.id}</td>
            {!todo.completed ? (
              <>
                <td className="is-vcentered" />
                <td className="is-vcentered is-expanded">
                  <p className="has-text-danger">{todo.title}</p>
                </td>
              </>
            ) : (
              <>
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
                <td className="is-vcentered is-expanded">
                  <p className="has-text-success">{todo.title}</p>
                </td>
              </>
            )}
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => dispatch(setCurrentTodo(todo))}
              >
                <span className="icon">
                  <i
                    className={
                      pick?.id === todo.id ? 'far fa-eye-slash' : 'far fa-eye'
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
