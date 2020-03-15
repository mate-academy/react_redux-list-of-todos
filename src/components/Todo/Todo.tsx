import React, { FC } from 'react';
import { connect } from 'react-redux';
import { User } from '../User/User';
import { TodoWithUsers, RootState } from '../../utils/interfaces';
import { removeTodo as deleteTodo } from '../../store/actionCreators';
import './Todo.css';

interface Props {
  todo: TodoWithUsers;
  removeTodo: (id: number) => void;
}

const TodoTemplate: FC<Props> = ({ todo, removeTodo }) => {
  const {
    id,
    title,
    user,
    completed,
  } = todo;

  return (
    <>
      <p className="todo__title">{title}</p>
      <User user={user} />
      <p className="todo__status">{completed ? 'OK' : '-'}</p>
      <button
        className="remove-button"
        type="button"
        onClick={() => removeTodo(id)}
      >
        Remove
      </button>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  todos: state.todos,
});

const mapDispatchToProps = {
  removeTodo: deleteTodo,
};

export const Todo = connect(mapStateToProps, mapDispatchToProps)(TodoTemplate);
