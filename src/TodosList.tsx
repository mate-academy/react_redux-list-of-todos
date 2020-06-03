import React, { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import ClassNames from 'classnames';
import { AllActions, DeleteTodo } from './store/store';
import './todo.scss';

type Props = {
  newTodos: TodoWithUser[];
  deleteTodo(argument: number): DeleteTodo;
};

const TodosList: React.FC<Props> = (props) => {
  const dispatch = useDispatch<Dispatch<AllActions>>();
  const { newTodos, deleteTodo } = props;

  return (
    <div className="todo">
      {newTodos.map(todo => (
        <div key={todo.id} className="todo__wrapper">
          <p className="todo__body">
            <span className="todo__user">
              <strong>
                {todo.user.name}
              </strong>
            </span>
            :
            {' '}
            {todo.title}
          </p>
          <div className={ClassNames('todo__process', {
            todo__done: todo.completed,
          })}
          >
            Completed:
            {' '}
            {todo.completed ? 'Done' : 'In the process'}
          </div>
          <button
            type="button"
            onClick={() => {
              dispatch(deleteTodo(todo.id));
            }}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodosList;
