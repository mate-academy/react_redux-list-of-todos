import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../../store';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const todos = useSelector(selectors.loadTodos);
  const selectedUserId = useSelector(selectors.getUserId);
  const errorTodos = useSelector(selectors.getError);
  const dispatch = useDispatch();

  const [filterByTitle, setFilterByTitle] = useState('');
  const [filterByComplete, setFilterComplete] = useState('all');
  const [visibleTodos, setVisibleTodos] = useState(todos);

  const getFilteredTodos = () => {
    const filterTodo = (todo: Todo) => {
      const queryToLower = filterByTitle.toLowerCase();
      const titleToLower = todo.title.toLowerCase();

      switch (filterByComplete) {
        case 'all':
          return titleToLower.includes(queryToLower);
        case 'active':
          return titleToLower.includes(queryToLower) && !todo.completed;
        case 'completed':
          return titleToLower.includes(queryToLower) && todo.completed;
        default:
          return todos;
      }
    };

    return todos.filter(filterTodo);
  };

  const removeTodo = (id: number) => {
    dispatch(actions.deleteTodo(id));
  };

  useEffect(() => {
    setVisibleTodos(getFilteredTodos());
  }, [filterByComplete, filterByTitle, todos]);

  const randomizer = () => {
    setVisibleTodos([...visibleTodos].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__filter">
        <input
          type="text"
          className="TodoList__field"
          placeholder="Enter title"
          data-cy="filterByTitle"
          value={filterByTitle}
          onChange={(event) => setFilterByTitle(event.target.value)}
        />

        <select
          className="TodoList__field"
          value={filterByComplete}
          onChange={(event) => {
            setFilterComplete(event.target.value);
          }}
        >
          <option value="all">
            All
          </option>
          <option value="active">
            Active
          </option>
          <option value="completed">
            Completed
          </option>
        </select>

        <button
          type="button"
          className="button TodoList__user-button--selected"
          onClick={randomizer}
        >
          Randomize
        </button>
      </div>

      <div className="TodoList__list-container">
        {!errorTodos
          ? (
            <ul className="TodoList__list" data-cy="listOfTodos">
              {visibleTodos.map(todo => (
                <li
                  key={todo.id}
                  className={classNames(
                    'TodoList__item',
                    {
                      'TodoList__item--unchecked': !todo.completed,
                      'TodoList__item--checked': todo.completed,
                    },
                  )}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      readOnly
                    />
                    <p>{todo.title}</p>
                  </label>
                  <div className="buttons">
                    <button
                      className={classNames(
                        'TodoList__user-button',
                        'button',
                        {
                          'TodoList__user-button--selected':
                            todo.userId === selectedUserId,
                        },
                      )}
                      type="button"
                      data-cy="userButton"
                      onClick={() => {
                        dispatch(actions.selectUser(todo.userId));
                      }}
                    >
                      User&nbsp;#
                      {todo.userId}
                    </button>
                    <button
                      className="button button__delete"
                      type="button"
                      onClick={() => removeTodo(todo.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )
          : <p>{errorTodos}</p>}
      </div>
    </div>
  );
};
