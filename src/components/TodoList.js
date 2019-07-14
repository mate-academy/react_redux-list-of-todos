import React from 'react';
import TodoItemHandler from './TodoItemHandler';

function TodoList(props) {
  if (!props.requested) {
    return (
      <div>
        <button className="initialButton" type="button" title="click to load TODOS" onClick={props.buttonClick}>Load</button>
      </div>
    );
  }
  if (props.todos === null) {
    return <div className="myPreloader"><p>Loading</p><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>;
  }
  return (
    <table>
      <thead>
        <tr>
          <td title="click to sort" onClick={() => props.sorting('title', props.todos)}>Title</td>
          <td title="click to sort" onClick={() => props.sorting('userName', props.todos)}>Author</td>
          <td title="click to sort" onClick={() => props.sorting('status', props.todos)}>Status</td>
        </tr>
      </thead>
      <tbody>
        {props.todos.map((item, index) => <TodoItemHandler todo={item} index={item.id} key={item.id}/>)}
      </tbody>
    </table>
  );
}

export default TodoList;
