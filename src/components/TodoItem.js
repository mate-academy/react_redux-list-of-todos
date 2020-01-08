import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteTodo } from '../store';
import User from './User';

// eslint-disable-next-line no-shadow
const TodoItem = ({ todo: { user, id, title, completed }, deleteTodo }) => (
  <tr>
    <td>{id}</td>
    <td>{title}</td>
    <td className="todo">
      <input type="checkbox" checked={completed} readOnly />
      <span>
        {completed ? 'completed' : 'not completed'}
      </span>
    </td>
    <td>
      <User
        user={user}
      />
    </td>
    <td>
      <button
        type="button"
        onClick={() => deleteTodo(id)}
      >
          X
      </button>
    </td>
  </tr>
);

const mapStateToProps = state => ({
  todoList: state.todoList,
});

TodoItem.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  todo: PropTypes.oneOfType([PropTypes.object])
    .isRequired,
};

export default connect(mapStateToProps, { deleteTodo })(TodoItem);
