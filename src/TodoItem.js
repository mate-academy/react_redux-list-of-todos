import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';
import { deleteTodo } from './store';

const TodoItem = ({ todo, deleteTodos }) => (
  <>
  <ul className="todo_item">
    <li className="todo_item-id">{todo.id}</li>
    <li className="todo_item-title">{todo.title}</li>
    <li className="todo_item-status">{todo.completed ? 'true' : 'false'}</li>
    <User user={todo.user} />
    </ul>
      <button
        type="button"
        className="button__delete"
        onClick={() => deleteTodos(todo.id)}
      >
          Remove
      </button>
  </>
);

const mapDispatchToProps = dispatch => ({
  deleteTodos: id => dispatch(deleteTodo(id)),
});

TodoItem.propTypes = {
  todo: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteTodos: PropTypes.func.isRequired,
};

export default connect('', mapDispatchToProps)(TodoItem);
