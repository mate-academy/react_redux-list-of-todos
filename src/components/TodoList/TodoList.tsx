import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, getTodos } from '../../api/todos';
import { LoadTodosAction, LoadUserAction } from '../../store/actions';
import { getTodosSelector } from '../../store/selectors';
import './TodoList.scss';
import { getUser } from '../../api/user';

export const TodoList: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('nofilter');

  const dispatch = useDispatch();

  const todos = useSelector(getTodosSelector);

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      dispatch(LoadTodosAction(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  const selectUser = async (userId: number) => {
    if (selectedUserId !== userId) {
      const userFromServer = await getUser(userId);

      setSelectedUserId(userId);

      dispatch(LoadUserAction(userFromServer));
    }
  };

  let preparedTodos = [...todos];

  useMemo(() => {
    if (searchQuery) {
      preparedTodos = [...todos].filter(todo => todo.title.includes(searchQuery));
    }

    if (filterBy !== 'nofilter') {
      preparedTodos = filterBy === 'completed'
        ? preparedTodos.filter(todo => todo.completed)
        : preparedTodos.filter(todo => !todo.completed);
    }
  }, [searchQuery, filterBy]);

  const handleSearchInput = (input: string) => {
    setSearchQuery(input);
  };

  const removeTodo = async (todoId: number) => {
    const todosFromServer = await deleteTodo(todoId);

    dispatch(LoadTodosAction(todosFromServer));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__search">
        <input
          type="text"
          placeholder="Search..."
          className="TodoList__searchbar"
          value={searchQuery}
          onChange={event => handleSearchInput(event.target.value)}
        />
        <select
          name=""
          id=""
          className="TodoList__selector"
          value={filterBy}
          onChange={event => setFilterBy(event.target.value)}
        >
          <option value="nofilter">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {preparedTodos.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--checked': todo.completed },
                { 'TodoList__item--unchecked': !todo.completed },
              )}
            >
              <label htmlFor="isCompleted">
                <input
                  id="isCompleted"
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <div className="TodoList__button-container">
                <button
                  className={classNames(
                    'button',
                    'TodoList__user-button',
                    { 'TodoList__user-button--selected': todo.userId === selectedUserId },
                  )}
                  type="button"
                  onClick={() => selectUser(todo.userId)}
                >
                  {`User\xa0#${todo.userId}`}
                </button>

                <button
                  className={classNames(
                    'button',
                    'TodoList__user-button',
                  )}
                  type="button"
                  onClick={() => removeTodo(todo.id)}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
