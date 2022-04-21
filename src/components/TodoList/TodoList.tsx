import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { handleCheck, loadTodos, loadUser } from '../../store/actions';
import { getTodosSelector, getUserSelector } from '../../store/selectors';
import './TodoList.scss';
import { Loader } from '../Loader/Loader';

export const TodoList: React.FC = React.memo(() => {
  const todos = useSelector(getTodosSelector);
  const currentUser = useSelector(getUserSelector);
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('all');

  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const visibledTodos = useMemo(() => (
    todos.filter(todo => {
      const lowerCaseQuery = query.toLowerCase();
      const lowerCaseTitle = todo.title.toLowerCase();

      if (!lowerCaseTitle.includes(lowerCaseQuery)) {
        return false;
      }

      switch (selectedOption) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    })
  ), [todos, selectedOption, query]);

  return (
    <>
      {todos.length
        ? (
          <div className="TodoList">
            <h2>Todos:</h2>

            <input
              className="TodoList__input"
              type="text"
              placeholder="Search title"
              value={query}
              onChange={handleInput}
            />

            <select
              className="TodoList__input"
              value={selectedOption}
              onChange={handleSelect}
            >
              <option value="all">all</option>
              <option value="active">active</option>
              <option value="completed">completed</option>
            </select>

            <div className="TodoList__list-container">
              <ul className="TodoList__list">
                {visibledTodos.map(({
                  id, completed, title, userId,
                }) => (
                  <li
                    key={id}
                    className={cn(
                      'TodoList__item',
                      { 'TodoList__item--unchecked': !completed },
                      { 'TodoList__item--checked': completed },
                    )}
                  >
                    <label htmlFor={String(id)}>
                      <input
                        type="checkbox"
                        id={String(id)}
                        defaultChecked={completed}
                        onChange={() => dispatch(handleCheck(id))}
                      />
                      <p className="TodoList__title">
                        {title}
                      </p>
                    </label>

                    <button
                      className={cn(
                        'TodoList__user-button',
                        {
                          'TodoList__user-button--selected': currentUser
                        && userId === currentUser.id,
                        },
                        'button',
                      )}
                      type="button"
                      onClick={() => dispatch(loadUser(userId))}
                    >
                      {`User# ${userId}`}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
        : (
          <Loader />
        )}
    </>
  );
});
