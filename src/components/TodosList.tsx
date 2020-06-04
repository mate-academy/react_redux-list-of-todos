import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, getSortedTodos } from '../store';

export const TodosList = () => {
  const dispatch = useDispatch();
  const sortedTodos = useSelector(getSortedTodos);

  return (
    <ul className="collection">
      {sortedTodos.map(({
        id, title, completed, user,
      }) => (
        <li
          className="collection-item"
          key={id}
        >
          <span className="name">{user.name}</span>
          <p>{title}</p>
          <i className={cn(
            'material-icons',
            'medium',
            { 'cyan-text': completed, 'pink-text darken-4': !completed },
          )}
          >
            {completed ? 'sentiment_very_satisfied' : 'sentiment_dissatisfied'}
          </i>
          <button
            type="button"
            className="btn-floating red btn-small"
            onClick={() => dispatch(deleteTodo(id))}
          >
            <i className="material-icons">delete</i>
          </button>
        </li>
      ))}
    </ul>
  );
};
