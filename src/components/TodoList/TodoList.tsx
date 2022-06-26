import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTodos, getUserById } from '../../api/api';
import { setTodosAction, setUserAction } from '../../store/action';
import { getTodosSelector, getUsersSelector } from '../../store/selectors';
import './TodoList.scss';

enum SeeFiltered {
  all = 'all',
  completed = 'completed',
  active = 'active',
}

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodosSelector);
  const user = useSelector(getUsersSelector);
  // =====================

  const [filter, setFilter] = useState('');
  const [selectFilter, setSelectFilter] = useState('all');

  const filteredByState
    = todos.filter(todo => {
      if (todo.completed === true && selectFilter === SeeFiltered.completed) {
        return true;
      }

      if (todo.completed === false && selectFilter === SeeFiltered.active) {
        return true;
      }

      if (selectFilter === SeeFiltered.all) {
        return true;
      }

      return false;
    });

  const filteredByTitle
    = filteredByState.filter(todo => todo.title.includes(filter));

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getAllTodos();

      dispatch(setTodosAction(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  const getUser = async (id: number) => {
    try {
      const userFromServ = await getUserById(id);

      dispatch(setUserAction(userFromServ));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        className="input"
        type="text"
        data-cy="filterByTitle"
        value={filter}
        onChange={event => {
          setFilter(event.target.value);
        }}
      />

      <div className="select">
        <select
          value={selectFilter}
          onChange={event => {
            setSelectFilter(event.target.value);
          }}
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {filteredByTitle.map(todo => (
            <li
              className={classNames('TodoList__item', {
                'TodoList__item--checked': todo.completed,
                'TodoList__item--unchecked': !todo.completed,
              })}
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={`TodoList__user-button button ${user?.id === todo.userId && 'TodoList__user-button--selected'}`}
                data-cy="userButton"
                type="button"
                onClick={() => {
                  getUser(todo.userId);
                }}
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
