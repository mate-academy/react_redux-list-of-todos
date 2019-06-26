import React from 'react';
import TodoItem from '../todo-item';

function TodoList({ todosList }) {
  return (
    <ul>
      {
        todosList.map(todo => {
          const { id, title, user, completed } = todo;
          return (
            <li key={id}>
              <TodoItem
                todoId={id}
                title={title}
                user={user}
                completed={completed}
              />
            </li>
          );
        })
      }
    </ul>
  );
}

export default TodoList;
