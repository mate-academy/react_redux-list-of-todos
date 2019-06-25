import React from 'react';
import TodoItemHandler from './TodoItemHandler';
import '../styles/TodoList.css';

export default function TodoList(props) {
  const { requested,
          data,
          buttonClicked,
          sortTodos } = props;

  if (!requested){
    return <button onClick={buttonClicked} className="load">Load TODOs</button>;
  }
  if (data === null) {
    return <button className="load" disabled>Loading...</button>;
  }

  return (
    <table className="todos-table">
      <thead>
        <tr>
          <th onClick={() => sortTodos('title')}>Item</th>
          <th onClick={() => sortTodos('userName')}>User</th>
          <th onClick={() => sortTodos('status')}>Status</th>
          <th>X</th>
        </tr>
      </thead>
      <tbody>
        {data.map((todo, index) => <TodoItemHandler todo={todo} index={index} key={todo.id} />)}
      </tbody>
    </table>
  );
}
