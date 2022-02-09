import { useEffect } from 'react';
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

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <label htmlFor="searchInput">
        Filter todos by title:
        <input
          type="text"
          id="searchInput"
          placeholder="Input title"
          // onChange={searchInput}
        />
      </label>

      <select
        id="selectTodos"
        placeholder="Input title"
        // onChange={filterSelect}
      >
        <option value="All">Show all</option>
        <option value="Active">Show active</option>
        <option value="Completed">Show completed</option>
      </select>

      <div className="TodoList__list-container">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames('TodoList__item', {
              'TodoList__item--unchecked': !todo.completed,
              'TodoList__item--checked': todo.completed,
            })}
          >
            <label htmlFor={todo.title}>
              <input
                type="checkbox"
                checked={todo.completed}
                // onChange={handleStatusChange}
                id={todo.title}
              />
              <p>{todo.title}</p>
            </label>

            <button
              // onClick={changeUser}
              // className={classNames('TodoList__user-button', 'button', {
              //   'TodoList__user-button--selected': selectedUserId === todo.userId,
              // })}
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
