import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { User } from '../User/User';
import { TodoWithUsers, State } from '../../interfaces';
import { REMOVE_TODO } from '../../constants';
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

const mapStateToProps = (state: State) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeTodo: (id: number) => dispatch({
    type: REMOVE_TODO,
    value: id,
  }),
});

export const Todo = connect(mapStateToProps, mapDispatchToProps)(TodoTemplate);
