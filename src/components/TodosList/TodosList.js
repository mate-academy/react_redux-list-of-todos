import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem';
import './TodosList.css';

const TodosList = (props) => {
  const {
    todos,
    callAction,
    isLoad,
    isLoading,
  } = props;

  return (
    (!isLoad && (
      <button
        type="button"
        onClick={callAction}
      >
        {isLoading ? 'Loading...' : 'Load todos'}
      </button>
    )) || (
      <>
        <h1 className="list__title">List of Todos</h1>
        <span className="list__length">{todos.length}</span>
        <div className="container">
          {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
        </div>
      </>
    )
  );
};

TodosList.PropTypes = {
  todos: PropTypes.array.isRequired,
  callAction: PropTypes.func.isRequired,
  isLoad: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default TodosList;
