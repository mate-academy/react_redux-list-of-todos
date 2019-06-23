import React from 'react';
import TodoItemHandler from './TodoItemHandler';
import './TodoList.css';
import Loading from './Loading';

function TodoItem(props) {
  if (!props.todosRequested) {
    return <button type="button" className='loaded' onClick={props.buttonClicked}>Load</button>;
  } else {
    if(props.data === null) {
      return <Loading />
    } else {
      return (
        <table>
          <thead>
            <tr>
              <th onClick={() => props.sorting(props.data, 'title')}>Title</th>
              <th onClick={() => props.sorting(props.data, 'author')}>Author</th>
              <th onClick={() => props.sorting(props.data, 'completed')}>Completed</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map(todoItem => <TodoItemHandler data={todoItem} key={todoItem.id}/>)}
          </tbody>
        </table>
      )
    }
  }
}

export default TodoItem;
