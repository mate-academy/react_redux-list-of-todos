import React, { useMemo } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTodos, deleteTodo, getSortType, setSortType, reverseTodos, getReverseStatus,
} from '../store';
import { controlPanelConfig } from '../helpers/config';

export const ListTodos: React.FC = () => {
  const dispatch = useDispatch();
  const todos: Todo[] = useSelector(getTodos);
  const sortType = useSelector(getSortType);
  const isReverse = useSelector(getReverseStatus);

  const changeSortType = (type: string) => {
    if (!type) {
      return;
    }

    if (type === sortType) {
      dispatch(reverseTodos(!isReverse));
    } else {
      dispatch(setSortType(type));
      dispatch(reverseTodos(false));
    }
  };

  const sortedTodos = useMemo(
    () => [...todos].sort((a: Todo, b: Todo): number => {
      switch (sortType) {
        case 'id':
          return (a.id - b.id);

        case 'username':
          return (String(a.user.username).localeCompare(String(b.user.username)));

        case 'title':
          return (a.title.localeCompare(b.title));

        case 'completed':
          return (+a.completed - +b.completed);

        default:
          return 0;
      }
    }),
    [sortType, todos, isReverse],
  );

  const reversedTodos = isReverse ? sortedTodos.reverse() : sortedTodos;

  return (
    <>
      <ul className="list">
        {controlPanelConfig.map(config => (
          <li className="item" key={config.name}>
            <a
              href="#"
              className="link"
              onClick={() => changeSortType(config.sortType)}
            >
              {config.name}
            </a>
          </li>
        ))}
      </ul>
      {reversedTodos.map(todo => (
        <div
          key={todo.id}
          className={cn({
            'todo completed': todo.completed,
            todo: !todo.completed,
          })}
        >
          <div className="id-todo">
            <p className="id__text">
              {todo.id}
            </p>
          </div>
          <div className="name">
            <p className="name__text">
              {todo.user?.username}
            </p>
          </div>
          <div className="title">
            <p className="title__text">
              {todo.title}
            </p>
          </div>
          <div className="status">
            <p className="status__text">
              {todo.completed ? 'Completed' : 'Active'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => dispatch(deleteTodo(todo.id))}
            className="delete"
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
};
