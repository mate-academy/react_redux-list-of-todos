import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import PropTypes from 'prop-types';
import User from './User';
import { deleteTodo } from './store';

const TodoItem = ({ todo, onDeleteTodo }) => (
  <tr>
    <td>{todo.id}</td>
    <td>{todo.title}</td>
    <td className={cn(
      { done: todo.completed },
      { undone: !todo.completed },
    )}
    >
      {todo.completed ? 'finished' : 'not finished'}
    </td>
    <td><User user={todo.user} /></td>
    <td>
      <button
        type="button"
        className="button button--delete"
        onClick={() => onDeleteTodo(todo.id)}
      >
          x
      </button>
    </td>
  </tr>
);

const mapDispatchToProps = dispatch => ({
  onDeleteTodo: id => dispatch(deleteTodo(id)),
});

TodoItem.propTypes = {
  todo: PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.object,
  }).isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(TodoItem);
