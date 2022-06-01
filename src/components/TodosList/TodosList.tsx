import {
  FC,
  memo,
  useCallback,
  useMemo,
  useState,
  ChangeEvent,
} from 'react';
import classNames from 'classnames';
import './TodoList.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  randomizeTodos,
  removeTodo,
  setVisibilityFilter,
  toggleCompleted,
  userLoad,
} from '../../store/actions';
import { Todo } from '../../types/Todo';
import { RootState } from '../../store/store';
import { FilterTypes } from '../../types/FilterTypes';
import { User } from '../../types/User';

export const TodoList: FC = memo(() => {
  const [query, setQuery] = useState('');

  const todos: Todo[] = useSelector(
    (state: RootState) => state.reducer.todos,
  );

  const visibilityFilter: string = useSelector(
    (state: RootState) => state.reducer.visibilityFilter,
  );

  const currentUser: User = useSelector(
    (state: RootState) => state.reducer.currentUser,
  );

  const { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } = FilterTypes;

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const filteredTodos = todo.title.toLowerCase().includes(query);

      switch (visibilityFilter) {
        case SHOW_ALL:
          return filteredTodos;

        case SHOW_COMPLETED:
          return filteredTodos && todo.completed;

        case SHOW_ACTIVE:

          return filteredTodos && !todo.completed;

        default:
          return filteredTodos;
      }
    });
  }, [visibilityFilter, todos, query]);

  const dispatch = useDispatch();

  const handleDelete = useCallback((id: number) => {
    dispatch(removeTodo(id));
  }, []);

  const handleSelectChange = useCallback((
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(setVisibilityFilter(event.target.value));
  }, []);

  const handleInputChange = useCallback((
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(event.target.value);
  }, []);

  const handleCheckboxChange = useCallback((id: number) => {
    dispatch(toggleCompleted(id));
  }, []);

  const randomize = useCallback(() => {
    dispatch(randomizeTodos());
  }, []);

  const setUser = useCallback((id: number) => {
    dispatch(userLoad(id));
  }, []);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__control">
        <label className="TodoList__filter-by-title">
          Filter by title:
          <input
            type="text"
            data-cy="filterByTitle"
            value={query}
            onChange={handleInputChange}
          />
        </label>

        <select
          className="TodoList__filter-by-completed"
          value={visibilityFilter}
          onChange={handleSelectChange}
        >
          <option value={SHOW_ALL}>All</option>
          <option value={SHOW_ACTIVE}>Active</option>
          <option value={SHOW_COMPLETED}>Completed</option>
        </select>

        <button
          type="button"
          className="button"
          onClick={randomize}
        >
          Randomize
        </button>
      </div>

      <ul className="TodoList__list" data-cy="listOfTodos">
        {!!visibleTodos.length && visibleTodos.map(todo => (
          <li
            key={todo.id}
            className={classNames(
              'TodoList__item',
              { 'TodoList__item--checked': todo.completed },
              { 'TodoList__item--unchecked': !todo.completed },
            )}
          >
            <div className="TodoList__todo">
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCheckboxChange(todo.id)}
                />
                <p>{todo.title}</p>
              </label>

              {todo.userId && (
                <button
                  className={classNames('TodoList__user-button', 'button',
                    {
                      'TodoList__user-button--selected':
                      currentUser && currentUser.id === todo.userId,
                    })}
                  type="button"
                  data-cy="userButton"
                  onClick={() => setUser(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>
              )}
            </div>

            <button
              type="button"
              className="button"
              onClick={() => handleDelete(todo.id)}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});
