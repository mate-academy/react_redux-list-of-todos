import React from 'react';
import { TodoItem } from '../TodoItem';
import './TodoList.css';
import { TodoListPropTypes } from '../../constants/proptypes';

const TodoList = ({
  todos,
  sortByTitle,
}) => (
  <>
    <div className="buttons-wrapper">
      <button
        type="button"
        className="sort-button"
        onClick={sortByTitle}
      >
        Sort by title
      </button>
    </div>
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  </>
);

TodoList.propTypes = TodoListPropTypes;

export default TodoList;
