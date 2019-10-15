import React from 'react';
import TodoItem from '../TodoItem';

const TodosList = (props) => {
  const {
    todos,
    callAction,
    isLoad,
  } = props;

  return (
    (!isLoad && (
      <button
        type="button"
        onClick={callAction}
      >
          Load
      </button>
    )) || (
      <div className="container">
        {todos.map(todo =>
          <TodoItem key={todo.id} todo={todo} />)
        }
      </div>
    )
  );
};

export default TodosList;
