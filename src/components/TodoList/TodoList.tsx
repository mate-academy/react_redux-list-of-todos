import React, { ChangeEvent, useCallback, useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../../store';
import { removeTodo } from '../../api';

export const TodoList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [statusOfTodo, setStatusOfTodo] = useState('all');

  const todos = useSelector(selectors.loadTodos);
  const dispatch = useDispatch();

  const preparingTodos = () => {
    const todosFilteredByTitle = todos.filter(({ title }) => {
      return title.toLowerCase().includes(appliedQuery.toLowerCase());
    });

    switch (statusOfTodo) {
      case 'active':
        return todosFilteredByTitle.filter(
          ({ completed }) => !completed,
        );

      case 'completed':
        return todosFilteredByTitle.filter(
          ({ completed }) => completed,
        );

      default:
        return todosFilteredByTitle;
    }
  };

  const preparedTodos = preparingTodos();

  const selectUser = useCallback((userId: number) => {
    dispatch(actions.selectUser(userId));
  }, []);

  const deleteTodo = useCallback(async (id: number) => {
    await removeTodo(id);

    dispatch(actions.deleteTodo(id));
  }, []);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const filterTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    applyQuery(value);
  };

  const selectedUser = useSelector(selectors.getUserId);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__input">
        <h3>Select todo title</h3>
        <label>
          <input
            className="TodoList__input--title"
            type="text"
            value={query}
            onChange={filterTitle}
            data-cy="filterByTitle"
          />
        </label>
      </div>
      <div className="TodoList__select">
        <h3>
          Select todo status:
        </h3>
        <select
          value={statusOfTodo}
          onChange={event => setStatusOfTodo(event.target.value)}
          className="TodoList__select--selector"
        >
          <option>all</option>
          <option>active</option>
          <option>completed</option>
        </select>
      </div>
      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {preparedTodos.map(todo => (
            <li
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--checked': todo.completed },
                { 'TodoList__item--unchecked': !todo.completed },
              )}
              key={todo.id}
            >
              <label>
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>
              </label>
              {todo.userId && (
                <div className="buttons">
                  <button
                    className={classNames(
                      'button',
                      'TodoList__user-button',
                      {
                        'TodoList__user-button--selected':
                          selectedUser === todo.userId,
                      },
                    )}
                    type="button"
                    data-cy="userButton"
                    value={todo.userId}
                    onClick={() => selectUser(todo.userId)}
                  >
                    {`User #${todo.userId}`}
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteTodo(todo.id)}
                    className="button 'TodoList__user-button'"
                  >
                    DELETE
                  </button>
                </div>
              )}
            </li>

          ))}
        </ul>
      </div>
    </div>
  );
};
