import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo } from './store/index';


type TodoItemProps = {
  todo: PreparedTodo;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={todo.completed
        ? 'user__completed-true'
        : 'user__completed-false'}
      >
        <div className="user">
          <span className="user__id">{todo.id}</span>
          <p className="user__name">
            Name:
            {' '}
            {todo.user.name}
          </p>
          <p className="user__title">
            Title:
            {' '}
            {todo.title}
          </p>
          <p className="user__status">
            Status:
            {' '}
            {todo.completed ? 'completed' : 'in procces'}
          </p>
          <button
            type="button"
            className="button__delete"
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            Delete Todo
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
