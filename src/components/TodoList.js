import React from 'react';
import TodoItemHandler from './TodoItemHandler';
import './TodoList.css';

function TodoList(props) {
  if (props.todos) {
    const itemsList = props.todos.map(item => <TodoItemHandler item={item} key={item.id} />);
    return (
      <table className='todos'>
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {itemsList}
        </tbody>
      </table>
    );
  }
  return (<button className='load' disabled={(props.requested) ? 'disabled' : ''}
    onClick={() => props.buttonLoadClicked()}>{(props.requested) ? 'Loading' : 'Load'}</button>);
};

export default TodoList;
