import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from '../components/User';
import { deleteTodo } from '../actions/todosWithUsers';

const TodoItem = ({ todo, delTodo }) => {
  const {
    title, completed, user, id,
  } = todo;

  return (
    <div className="todo-list__item">
      <h2>{id}</h2>
      <h4>{title}</h4>
      <input type="checkbox" checked={completed} readOnly />
      <User user={user} />
      <button
        className="button button--delete"
        type="button"
        onClick={() => delTodo(id)}
      >
        delete
      </button>
    </div>
  );
};

const shape = PropTypes.shape({
  title: PropTypes.string,
  completed: PropTypes.bool,
  id: PropTypes.number,
  user: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
});

TodoItem.propTypes = {
  todo: shape.isRequired,
  delTodo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  delTodo: id => dispatch(deleteTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
