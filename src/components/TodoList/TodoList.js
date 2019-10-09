import React from 'react';
import './TodoList.css';

import { TodoItem } from '../TodoItem/TodoItem';
import { store } from '../../store';

export const TodoList = () => (
  <div>
    <div className="list-cards">
      {store.getState().todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  </div>
);
