import React, {
  ChangeEvent,
  useState,
  useCallback,
} from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo } from '../../api';

import { actions, selectors } from '../../store';

type FuncArg = (v: string) => void;

const debounce = (f: FuncArg, delay: number) => {
  let timerId: number;

  return (...args: string[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};

export const TodoList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [random, setRandom] = useState(false);
  const [sort, setSort] = useState(false);

  const todos = useSelector(selectors.loadTodos);
  const selectedUserId = useSelector(selectors.getUserId);

  const dispatch = useDispatch();

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const filterTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    applyQuery(value);
  };

  const changeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setStatus(value);
  };

  const todosFilterByStatus = () => {
    const filteredTodos = todos.filter(({ title }) => {
      const changeTitle = title.toLowerCase();

      return changeTitle.includes(appliedQuery.toLowerCase());
    });

    switch (status) {
      case 'Active':
        return filteredTodos.filter(({ completed }) => !completed);

      case 'Completed':
        return filteredTodos.filter(({ completed }) => completed);

      default:
        return filteredTodos;
    }
  };

  const randomize = (array: Todo[]) => {
    const newArr = [...array];

    for (let i = newArr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }

    return newArr;
  };

  const sortList = (arr: Todo[]) => {
    return [...arr].sort((t1, t2) => (t1.title).localeCompare(t2.title));
  };

  const filteredTodosByStatus = todosFilterByStatus();
  const randomisedTodos = random
    ? randomize(filteredTodosByStatus)
    : filteredTodosByStatus;
  const todosForRender = sort ? sortList(randomisedTodos) : randomisedTodos;

  const handleRemoveTodo = async (id: number) => {
    await removeTodo(id);

    dispatch(actions.deleteTodo(id));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <p>Search by title</p>
      <label>
        <input type="text" value={query} onChange={filterTitle} />
      </label>
      <select
        value={status}
        onChange={changeStatus}
        className="TodoList__select"
      >
        <option>All</option>
        <option>Active</option>
        <option>Completed</option>
      </select>

      <button
        type="button"
        onClick={() => setRandom(state => !state)}
        className="TodoList__additionButton"
      >
        Randomize
      </button>

      <button
        type="button"
        className="TodoList__additionButton"
        onClick={() => setSort(state => !state)}
      >
        Sort
      </button>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {todosForRender.map(({
            userId,
            completed,
            title,
            id,
          }) => (
            <li
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--checked': completed },
                { 'TodoList__item--unchecked': !completed },
              )}
              key={id}
            >
              <label>
                <input type="checkbox" readOnly />
                <p>{title}</p>
              </label>

              <div>
                <button
                  data-cy="userButton"
                  className={classNames('TodoList__user-button button', {
                    'TodoList__user-button--selected':
                    userId === selectedUserId,
                  })}
                  type="button"
                  onClick={() => dispatch(actions.selectUser(userId))}
                >
                  {userId ? `User ${userId}` : 'No user'}
                </button>

                <button
                  type="button"
                  onClick={() => handleRemoveTodo(id)}
                  className="TodoList__deleteButton button"
                >
                  🗑
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
