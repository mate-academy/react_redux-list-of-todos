import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { getTodos } from '../../Api/Api';
import './TodosList.scss';

export const TodosList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const todos = await getTodos();

      dispatch({ type: 'LOAD_TODOS', payload: todos });
    })();
  }, []);

  const todos = useSelector((state: RootState) => state.todos);
  const searchTitle = useSelector((state: RootState) => state.searchTitle);
  const filterParameter = useSelector((state: RootState) => state.filterParameter);
  const selectedUserId = useSelector((state: RootState) => state.selectedUserId);

  const visibleTodos = todos.filter(todo => {
    switch (filterParameter) {
      case 'Active':
        return todo.title.includes(searchTitle) && !todo.completed;

      case 'Completed':
        return todo.title.includes(searchTitle) && todo.completed;

      default:
        return todo.title.includes(searchTitle);
    }
  });

  const userSetter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget.dataset;

    dispatch({ type: 'SET_USER_ERROR', payload: '' });
    dispatch({ type: 'SET_SELECTED_USER_ID', payload: Number(id) });
  };

  const changeUser = useMemo(() => userSetter, [selectedUserId]);

  const handleStatusChange = (event: React.ChangeEvent) => {
    const todoCopy = [...todos];
    const changedTodoIndex = todoCopy.findIndex(todo => `user-button-${todo.id}` === event.target.id);

    todoCopy[changedTodoIndex].completed = !todoCopy[changedTodoIndex].completed;
    dispatch({ type: 'TOGGLE_TODO_STATUS', payload: todoCopy });
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        {visibleTodos.map(todo => (
          <li
            key={todo.id}
            className={classNames('TodoList__item', {
              'TodoList__item--unchecked': !todo.completed,
              'TodoList__item--checked': todo.completed,
            })}
          >
            <label htmlFor={`user-button-${todo.id}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleStatusChange}
                id={`user-button-${todo.id}`}
              />
              <p>{todo.title}</p>
            </label>

            <button
              onClick={changeUser}
              className={classNames('TodoList__user-button', 'button', {
                'TodoList__user-button--selected': selectedUserId === todo.userId,
              })}
              type="button"
              data-id={todo.userId}
            >
              User&nbsp;#
              {todo.userId}
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};
