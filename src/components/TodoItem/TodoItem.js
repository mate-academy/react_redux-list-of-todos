import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoItem.css';
import User from '../User/User';
import { deleteTodo } from '../../store';

const TodoItem = ({ todo, deleteItem }) => {
  const {
    id,
    completed,
    title,
    user,
  } = todo;
  const classItem = classNames('task-container', { disabled: completed });

  return (
    <li className="list-group-item">
      <button
        id={id}
        type="button"
        className="btn btn-outline-danger btn-sm"
        title="Delete task"
        onClick={event => deleteItem(Number(event.target.id))}
      >
        x
      </button>
      <div className={classItem}>
        <span className="li-task">Task:&nbsp;</span>
        {title}
        &nbsp;|&nbsp;
        <User {...user} />
      </div>
    </li>
  );
};

const shape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
});

TodoItem.propTypes = {
  todo: shape.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

const getMethod = dispatch => ({
  deleteItem: id => dispatch(deleteTodo(id)),
});

export default connect(
  null,
  getMethod,
)(TodoItem);
