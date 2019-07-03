import React from 'react';
import Buttons from './Buttons';
import TodoList from './TodoList';

function Main({ todosWithUser, isRequested, request }) {
  if (todosWithUser) {
    return (
      <table>
        <thead>
          <tr>
            <th>TODO</th>
            <th>Name</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          <TodoList todos={todosWithUser} />
        </tbody>
      </table> 
    );
  } else {
    return (
      <Buttons isRequested={isRequested} onClickHandler={request}/>
    );
  }
}

export default Main;