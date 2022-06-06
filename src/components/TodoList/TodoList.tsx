import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TodoList.scss';
import classnames from 'classnames';
import { getTodoSelector, getUserIdSelector } from '../../store/selectors';
import { ACTIONS } from '../../store/actions';

enum TodoStatus {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const TodoList: React.FC = () => {
  const { selectUserId } = ACTIONS;
  const [query, setQuery] = useState('');
  const [selectValue, setSelectValue] = useState('');

  const todos = useSelector(getTodoSelector);
  const selectedUserId = useSelector(getUserIdSelector);
  const dispatch = useDispatch();

  const visibleTodos = useMemo(() => {
    const filteredTodos = todos.filter((todo: { title: string; }) => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));

    switch (selectValue) {
      case TodoStatus.Active:
        return filteredTodos.filter(todo => !todo.completed);
      case TodoStatus.Completed:
        return filteredTodos.filter(todo => todo.completed);

      case TodoStatus.All:
      default:
        return filteredTodos;
    }
  }, [todos, query, selectValue]);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        className="TodoList__input"
        placeholder="Type search word"
        value={query}
        onChange={handleChangeInput}
      />

      <select
        className="TodoList__select"
        onChange={handleChangeSelect}
        value={selectValue}
      >
        {Object.keys(TodoStatus).map(key => (

          <option
            value={key}
            key={key}
          >
            {key}
          </option>

        ))}
      </select>
      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {visibleTodos.map(todo => (
            <li
              className={classnames({
                TodoList__item: true,
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={classnames(
                  'TodoList__user-button',
                  {
                    'TodoList__user-button--selected':
                    todo.userId === selectedUserId,
                  },
                  'button',
                )}
                data-cy="filterByTitle"
                type="button"
                onClick={() => dispatch(selectUserId(todo.userId))}
              >
                User&nbsp;#
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
