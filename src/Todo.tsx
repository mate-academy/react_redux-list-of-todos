import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import User from './User';
import { deleteTodo } from './store/index';

type Props = {
  todo: TodoProps;
};

const Todo: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <div className={classNames('card', 'text-white', 'mb-3', 'gg', { 'bg-success': todo.completed, 'bg-danger': !todo.completed })}>
      <div className="card-header">{todo.title}</div>
      <div className="card-body">
        <h5 className="card-title">{todo.completed ? <p>Status: completed</p> : <p>Status: not completed</p>}</h5>
        <div className="card-text"><User user={todo.user} /></div>
        <button className="delete-button" type="button" onClick={() => dispatch(deleteTodo(todo.id))}>x</button>
      </div>
    </div>
  );
};

export default Todo;
