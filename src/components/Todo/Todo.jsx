import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId, getUserId } from '../../store/index';

export const Todo = ({
  userId,
  title,
  completed,
}) => {
  const dispatch = useDispatch();
  const selectedId = useSelector(getUserId);

  const onUserSelect = (id) => {
    dispatch(setUserId(id));
  };

  return (
    <li className={classNames('TodoList__item', {
      'TodoList__item--checked': completed,
      'TodoList__item--unchecked': !completed,
    })}
    >
      <label>
        <input type="checkbox" readOnly />
        <p>{title}</p>
      </label>

      <button
        className={classNames(`
        TodoList__user-button button`, {
          'TodoList__user-button--selected': userId === selectedId,
        })}
        onClick={() => onUserSelect(userId)}
        type="button"
      >
        User #
        {userId}
      </button>
    </li>
  );
};

Todo.propTypes = {
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
