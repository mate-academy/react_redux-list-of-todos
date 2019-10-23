import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { TodoListProps } from '../../constants/proptypes';

import './TodoList.css';

const TodoList = props => (
  <ul className="list-group todo-list">
    {props.todos.map(todo => (
      <li className="list-group-item" key={todo.id}>
        <TodoItem todo={todo} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = TodoListProps;

export default TodoList;
