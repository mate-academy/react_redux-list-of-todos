import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { selectUser } from '../../store/actions';

export function Todo({ todo }) {

  const dispatch = useDispatch();
  return (
    <li className={classNames(
      'TodoList__item',
      { 'TodoList__item--unchecked': todo.completed },
      { 'TodoList__item--checked': !todo.completed },
    )}
    >
      <label>
        <input
          type="checkbox"
          readOnly
          checked={!todo.completed}
        />
        <p>{todo.title}</p>
      </label>

      <button
        className="
          TodoList__user-button
          TodoList__user-button--selected
          button
        "
        type="button"
        onClick={() => dispatch(selectUser(todo.userId))}
      >
        User&nbsp;#
        {todo.userId}
      </button>
    </li>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    completed: PropTypes.bool,
    createdAt: PropTypes.string.isRequired,
    title: PropTypes.string,
    updatedAt: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    userId: PropTypes.number,
  }).isRequired,
};
