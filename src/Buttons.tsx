import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortTodos, todosList } from './store/index';
import { BUTTONS } from './api/helpers';

const Buttons = () => {
  const todos = useSelector(todosList);
  const dispatch = useDispatch();

  const handleSort = (sortField: string) => {
    switch (sortField) {
      case 'title':
      case 'user':
        dispatch(sortTodos(todos.sort((a, b) => (
          a[sortField].localeCompare(b[sortField])
        ))));
        break;
      case 'completed':
        dispatch(sortTodos(todos.sort((a, b) => (
          +a.completed - +b.completed
        ))));
        break;
      default: dispatch(sortTodos(todos));
    }
  };

  return (
    <div className="buttons">
      {BUTTONS.map(button => (
        <button
          key={button.name}
          className="button"
          type="button"
          onClick={() => handleSort(button.name)}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
