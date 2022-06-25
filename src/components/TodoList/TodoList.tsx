import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../react-app-env';
import './TodoList.scss';

interface Props {
  todosFromServer: Todo[];
  selectUser: React.Dispatch<React.SetStateAction<number>>;
  selectedUserId: number;
}

enum SeeFiltered {
  all = 'all',
  completed = 'completed',
  active = 'active',
}

export const TodoList: React.FC<Props> = ({
  todosFromServer, selectUser, selectedUserId,
}) => {
  const [filter, setFilter] = useState('');
  const [selectFilter, setSelectFilter] = useState('all');

  const filteredByState
    = todosFromServer.filter(todo => {
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
                className={`TodoList__user-button button ${selectedUserId === todo.userId && 'TodoList__user-button--selected'}`}
                data-cy="userButton"
                type="button"
                onClick={() => {
                  selectUser(todo.userId);
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
