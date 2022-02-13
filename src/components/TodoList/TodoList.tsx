import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const [titleSearch, setTitleSearch] = useState('');
  const [statusOfTodos, setStatusOfTodos] = useState('any');
  const {
    loadTodos,
    updateTodos,
    setUserId,
    deleteTodo,
  } = useActions();
  const store = useTypedSelector(state => state);

  const { todos } = store.todo;
  const { userId } = store.user;

  useEffect(() => {
    loadTodos();
  }, []);

  const handleChangeTodoStatus = (todoId: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    updateTodos(updatedTodos);
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleSearch(e.currentTarget.value);
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusOfTodos(e.currentTarget.value);
  };

  const filterTodos = (): Todo[] => {
    let filteredTodos;

    switch (statusOfTodos) {
      case 'active':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filteredTodos = todos.filter(todo => todo.completed);
        break;

      default:
        filteredTodos = [...todos];
    }

    return filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(titleSearch.toLocaleLowerCase())
    ));
  };

  const filteredTodos = filterTodos();

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div>
        <label htmlFor="filter">
          Filter by title
          <input
            type="text"
            id="filter"
            value={titleSearch}
            onChange={handleChangeSearch}
          />
        </label>
        <select
          value={statusOfTodos}
          onChange={handleChangeSelect}
        >
          <option value="any">Show all</option>
          <option value="active">Show active</option>
          <option value="completed">Show completed</option>
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {
            filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed },
                )}
              >
                <button
                  type="button"
                  onClick={() => deleteTodo(todo.id)}
                >
                  X
                </button>
                <label htmlFor={String(todo.id)}>
                  <input
                    id={String(todo.id)}
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => {
                      handleChangeTodoStatus(todo.id);
                    }}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    { 'TodoList__user-button--selected': userId === todo.userId },
                    'button',
                  )}
                  type="button"
                  onClick={() => setUserId(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};
