import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import User from './User';
import store from './store';

const TodoItem = ({ todo, todosAndUsers, setTodosAndUsers }) => {
  const status = (todo.completed) ? 'done' : 'in progress';

  const deleteItem = (id) => {
    const filteredTodos = todosAndUsers[0].filter(todos => todos.id !== id);
    const usersFromColection = todosAndUsers[1];

    setTodosAndUsers([filteredTodos, usersFromColection]);
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

const storeData = state => ({
  todosAndUsers: state.todosAndUsers,
});

const setStoreData = () => ({
  setTodosAndUsers: newSetData => store.dispatch({
    type: 'CHANGE_ROW',
    todosAndUsers: newSetData,
  }),
});

TodoItem.propTypes = {
  todo: PropTypes.objectOf(PropTypes.any).isRequired,
  todosAndUsers: PropTypes.arrayOf(PropTypes.any).isRequired,
  setTodosAndUsers: PropTypes.func.isRequired,
};

export default connect(storeData, setStoreData)(TodoItem);
