import React, { useMemo } from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { getTodos, getSortBy, deleteTodo } from '../store';

export const TodosList = () => {
  const todos = useSelector(getTodos);
  const sortBy = useSelector(getSortBy);
  const dispatch = useDispatch();

  const getSortedTodos = (todosList: Todo[], sortType: string) => {
    switch (sortType) {
      case 'title':
        return [...todosList].sort((a, b) => (
          a.title.localeCompare(b.title)
        ));

      case 'completed':
        return [...todosList].sort((a, b) => (
          Number(b.completed) - Number(a.completed)
        ));

      case 'name':
        return [...todosList].sort((a, b) => (
          a.user.name.localeCompare(b.user.name)
        ));

      default:
        return todosList;
    }
  };

  const sortedTodos = useMemo(() => {
    return getSortedTodos(todos, sortBy);
  }, [sortBy, todos]);

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
