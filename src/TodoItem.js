import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import PropTypes from 'prop-types';
import User from './User';
import { deleteTodo as deletTodoAction } from './store';

const TodoItem = ({ todo, deleteTodo }) => (
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
        onClick={() => deleteTodo(todo.id)}
      >
          x
      </button>
    </td>
  </tr>
);

const mapDispatchToProps = dispatch => ({
  deleteTodo: id => dispatch(deletTodoAction(id)),
});

TodoItem.propTypes = {
  todo: PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.object,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(TodoItem);
