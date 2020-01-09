import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import User from './User';

const TodoItem = ({ todo, todos, settodos }) => {
  const status = (todo.completed) ? 'done' : 'in progress';

  const deleteItem = (id) => {
    const filteredTodos = todos.filter(todos => todos.id !== id);

    settodos(filteredTodos);
  };

  return (
    <tr className="row">
      <td className="rowOfTasks">{todo.id}</td>
      <td className="rowOfTasks">{todo.title}</td>
      <User user={todo.user} />
      <td className="rowOfTasks last_cell">
        {status}
        <button
          type="button"
          className="delete_button"
          onClick={() => (
            deleteItem(todo.id)
          )}
        >
          x
        </button>
      </td>
    </tr>
  );
};

const mapStateToProps = state => ({
  todos: state.todos,
});

const setmapStateToProps = (dispatch) => ({
  settodos: newSetData => dispatch({
    type: 'CHANGE_ROW',
    todos: newSetData,
  }),
});

TodoItem.propTypes = {
  todo: PropTypes.objectOf(PropTypes.any).isRequired,
  todos: PropTypes.arrayOf(PropTypes.any).isRequired,
  settodos: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, setmapStateToProps)(TodoItem);
