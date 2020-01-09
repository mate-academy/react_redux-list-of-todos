import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Users from './Users';
import { todosDelete } from './store';

const TodoItem = ({ todo, deleteItems }) => (
  <tr>
    <td className="td">{todo.id}</td>
    <td className="td">{todo.title}</td>
    <td className="td">
      <Users user={todo.user} />
    </td>
    <button
      type="button"
      onClick={() => deleteItems(todo.id)}
      className="ui icon button"
    >
      <i className="trash alternate icon" />
    </button>
  </tr>
);

TodoItem.propTypes = {
  todo: PropTypes.string.isRequired,
  deleteItems: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  todos: state.todos,
});

const mapDispatchProps = dispatch => ({
  deleteItems: item => dispatch(todosDelete(item)),
});

export default connect(mapStateToProps, mapDispatchProps)(TodoItem);
