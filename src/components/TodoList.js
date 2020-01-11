import React from 'react';
import TodoItem from './TodoItem';
import { TodosContext } from '../context';

const TodoList = () => (
  <table className="ui red table">
    <thead>
      <tr>
        <th>TODO item</th>
        <th>The name of the user</th>
        <th>Completed</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <TodosContext.Consumer>
        {value => value.todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </TodosContext.Consumer>
    </tbody>
  </table>
);

export default TodoList;
