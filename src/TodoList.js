import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = (
  { todos, sortTodos, deleteTodo }
) => (
  <section>
    <div className="listTodos__sort">
      <button
        type="button"
        className="button"
        onClick={() => sortTodos('title')}
      >
        Sort by Title
      </button>
      <button
        type="button"
        className="button"
        onClick={() => sortTodos('name')}
      >
        Sort by Name
      </button>
      <button
        type="button"
        className="button"
        onClick={() => sortTodos('progress')}
      >
        Sort by Progress
      </button>
    </div>
    <ul className="listTodos__body">
      <Todo todos={todos} deleteTodo={deleteTodo} />
    </ul>
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortTodos: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
