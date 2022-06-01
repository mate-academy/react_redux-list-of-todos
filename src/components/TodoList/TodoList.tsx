import React from 'react';
import './TodoList.scss';
import classnames from 'classnames';
import { Todo } from '../../store/types';

type Props = {
  todos: Todo[],
  onSelect: (userId: number) => void,
  getVisibleTodos: (todos: Todo[], query: string) => Todo[],
  query: string,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect,
  getVisibleTodos,
  query,
}) => {
  const visibleTodos = getVisibleTodos(todos, query);

  return (
    <div className="TodoList">
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
                className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
                data-cy="filterByTitle"
                type="button"
                onClick={() => onSelect(todo.userId)}
              >
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
