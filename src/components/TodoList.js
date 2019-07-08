import React from 'react';
import TodoItemHandler from './TodoItemHandler';

export default function TodoList(props) {
  if (!props.articleRequested) {
    return <button onClick={props.buttonClicked} className='requestingButton'>Load data</button>
  }
  if (props.articleData === null) {
    return <button className='requestingButton'>Loading<br />...</button>
  }
  return (
    <table className='listOfTodos'>
      <thead>
        <tr>
          <th onClick={() => props.sortData('title')}>Title</th>
          <th onClick={() => props.sortData('name')}>User</th>
          <th onClick={() => props.sortData('email')}>Email</th>
          <th onClick={() => props.sortData('completed')}>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.articleData.map((todo, index) => <TodoItemHandler todo={todo} index={index} key={todo.id} />)}
      </tbody>
    </table>
  );

}
