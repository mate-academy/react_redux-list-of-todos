import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Select } from '../../App';
import { setShownTodos } from '../../features/todos';
import { setSingleTodo } from '../../features/currentTodo';

export const TodoList = () => {
  const { status: selectedValue, query: searchQueryTitle } = useAppSelector(
    state => state.filter,
  );
  const { todos, shownTodos } = useAppSelector(state => state.todos);
  const singleTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const filterTodos = todos?.filter(todo => {
      const filterQueryTitle = todo.title
        .toLowerCase()
        .includes(searchQueryTitle.toLowerCase());

      if (selectedValue === Select.ALL) {
        return filterQueryTitle;
      }

      if (selectedValue === Select.COMPLETED) {
        return filterQueryTitle && todo.completed;
      }

      if (selectedValue === Select.ACTIVE) {
        return filterQueryTitle && !todo.completed;
      }

      return false;
    });

    dispatch(setShownTodos(filterTodos));
  }, [searchQueryTitle, selectedValue, todos, dispatch]);

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
        {shownTodos?.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={
              todo.id === singleTodo?.id ? 'has-background-info-light' : ''
            }
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
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => dispatch(setSingleTodo(todo))}
              >
                <span className="icon">
                  <i
                    className={`far ${singleTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
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
