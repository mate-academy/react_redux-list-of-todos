import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import PropTypes from 'prop-types';
import User from './User';
<<<<<<< HEAD
import { deleteTodo as deletTodoAction } from './store';

const TodoItem = ({ todo, deleteTodo }) => (
=======
import { deleteTodo } from './store';

const TodoItem = ({ todo, onDeleteTodo }) => (
>>>>>>> 1636abb8c8b26f40a8138ca0f779a690282d5166
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
<<<<<<< HEAD
        onClick={() => deleteTodo(todo.id)}
=======
        onClick={() => onDeleteTodo(todo.id)}
>>>>>>> 1636abb8c8b26f40a8138ca0f779a690282d5166
      >
          x
      </button>
    </td>
  </tr>
);

const mapDispatchToProps = dispatch => ({
<<<<<<< HEAD
  deleteTodo: id => dispatch(deletTodoAction(id)),
=======
  onDeleteTodo: id => dispatch(deleteTodo(id)),
>>>>>>> 1636abb8c8b26f40a8138ca0f779a690282d5166
});

TodoItem.propTypes = {
  todo: PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.object,
  }).isRequired,
<<<<<<< HEAD
  deleteTodo: PropTypes.func.isRequired,
=======
  onDeleteTodo: PropTypes.func.isRequired,
>>>>>>> 1636abb8c8b26f40a8138ca0f779a690282d5166
};
export default connect(null, mapDispatchToProps)(TodoItem);
