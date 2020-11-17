import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { TodoInterface } from '../../components/interfaces';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos }: any) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map((todo: TodoInterface) => (
          <li
            className={classNames(
              'TodoList__item',
              {
                'TodoList__item--checked': todo.completed,
                'TodoList__item--unchecked': !todo.completed,
              },
            )}
            key={todo.id}
          >
            <Todo todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  </div>
)
