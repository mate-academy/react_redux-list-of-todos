import React from 'react';
import TodoItemHandler from './TodoItemHandler';
import './TodoList.css';

function TodoList(props) {
  const { todoMap, loadTodos, loadUsers, isLoading, isLoaded } = props;
  if (isLoaded) {
    const itemsList = todoMap.map(item => <TodoItemHandler item={item} key={item.id} />);
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
  return (<button className='load' disabled={(isLoading) ? 'disabled' : ''}
    onClick={() => {
      loadTodos();
      loadUsers();
    }}>{(isLoading) ? 'Loading' : 'Load'}</button>);
};

export default TodoList;
