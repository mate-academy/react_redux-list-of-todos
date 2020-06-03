import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../store';
import './ListOfTodos.scss';

type Props = {
  todos: Todo[];
};

const ListOfTodos: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <ul className="list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : 'notCompleted'}>
            <input type="checkbox" checked={todo.completed} disabled />
            {`${todo.title} `}
            (
            {todo.user ? todo.user.name : 'Unknown'}
            )
            <div className="button_wrapper">
              <button
                type="button"
                className="delete-button"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                Delete todo
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfTodos;
