import React from 'react';
import PropTypes from 'prop-types';
import TodoItemHandler from '../todo-item/TodoItemHandler';
import './TodoList.css';

function TodoList({ todos = [], todosSorted = [], isSorted }) {
  return (
    <>
      <p>
       Todos:
      </p>
      <div>
        {!isSorted
          ? (
            todos.map(todo => (
              <TodoItemHandler todo={todo} key={todo.id} />
            ))
          )
          : (
            todosSorted.map(todo => (
              <TodoItemHandler todo={todo} key={todo.id} />
            ))
          )}
      </div>
    </>
  );
}

const shape = PropTypes.shape({
  title: PropTypes.string,
  completed: PropTypes.string,
});

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      todo: shape,
    }).isRequired,
  ).isRequired,
  todosSorted: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      todo: shape,
    }).isRequired,
  ).isRequired,
  isSorted: PropTypes.bool.isRequired,
};

export default TodoList;
