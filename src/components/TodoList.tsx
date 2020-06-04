import React from 'react';
import User from './User';

import { useDispatch } from 'react-redux';
import { deleteTodo } from '../store';

import { Todos } from '../api/api';

type Props = {
  todoList: Todos[];
}

const TodoList: React.FC<Props> = ({ todoList }) => {
  const dispatch = useDispatch();

  const deleteSelectedTodo = (id: number) => {
    dispatch(deleteTodo(todoList.filter(todo => todo.id !== id)))
  }

  return (
    <ul className="todo_list">
      {todoList.map(todo => (
        <li className={
          todo.completed
            ? 'todo_item todo_item-done'
            : 'todo_item'
        }>
          <User todo={todo} />
          <div>
            <span className="todo_title-text">
              Todos: &nbsp;
            </span>
            {todo.title}
          </div>
          <div className="todo_status">
            {todo.completed
              ? 'True'
              : 'False'}
          </div>
          <button
            type="button"
            className="button delete-button"
            onClick={() => deleteSelectedTodo(todo.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList;
