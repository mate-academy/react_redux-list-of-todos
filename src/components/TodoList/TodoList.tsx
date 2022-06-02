import React, { ChangeEvent, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '../../store/index';
import { actions, deleteTodo } from '../../store/actions';
import './TodoList.scss';

// import { Todo } from '../../react-app-env';

export const TodoList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedTodos, setSelectedTodos] = useState('');

  const todos = useSelector(selectors.loadTodosSelector);

  const dispatch = useDispatch();

  const getVisibleTodos = () => {
    switch (selectedTodos) {
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'Completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const visibleTodos = getVisibleTodos();

  const filteredVisibleTodos = visibleTodos.filter(todo => (
    todo.title.toLowerCase().includes(query.toLowerCase())
  ));

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onChangeSelected = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTodos(event.target.value);
  };

  // const handleUser = useCallback((userId: number) => {
  //   dispatch(actions.selectUserAction(userId));
  // }, []);

  const handleDeleteTodo = useCallback((id: number) => {
    dispatch(deleteTodo(id));
  }, []);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div>
        <label>
          <input
            type="text"
            value={query}
            data-cy="filterByTitle"
            onChange={onChangeInput}
          />
        </label>
        <select
          className="TodoList__select"
          value={selectedTodos}
          onChange={onChangeSelected}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="TodoList__list-container">
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {
            filteredVisibleTodos.map(todo => (
              <>
                <li
                  className={`
                    TodoList__item
                    ${todo.completed
                ? 'TodoList__item--checked'
                : 'TodoList__item--unchecked'
              }`}
                  key={todo.id}
                >
                  <label>
                    <input
                      type="checkbox"
                      readOnly
                    />
                    <p>{todo.title}</p>
                  </label>
                  {todo.userId && (
                    <div>
                      <button
                        type="button"
                        data-cy="userButton"
                        className={`TodoList__user-button button
                       ${todo.completed
                          && 'TodoList__user-button--selected'}
                        `}
                        onClick={() => dispatch(
                          actions.selectUserAction(todo.userId),
                        )}
                      >
                        {`User ${todo.userId}`}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="TodoList__deleteButton button"
                      >
                        DELETE
                      </button>
                    </div>
                  )}
                </li>
              </>
            ))
          }
        </ul>
      </div>
    </div>
  );
};
