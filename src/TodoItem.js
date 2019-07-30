import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';
import { deleteTodo } from './actionCreator';

function TodoItem(props) {
  const removeTodo = (id) => {
    const { deleteTodo } = props;
    deleteTodo(id);
  };

  return (
    <tr>
      <td>{props.todo.todo.id}</td>
      <td>{props.todo.todo.title}</td>
      <User todo={props.todo} />
      <td className="table-noborder">
        <button
          type="button"
          className="table--button"
          onClick={() => removeTodo(props.todo.todo.id)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.objectOf(PropTypes.object).isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default connect(state => ({
  tasks: state.tasks,
}),
{ deleteTodo })(TodoItem);
