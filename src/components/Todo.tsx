import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DELETE_TODO } from '../constants';
import { PreparedTodo, State } from '../interfaces';

interface Props {
  todo: PreparedTodo;
  deleteTodo: (id: number) => void;
}

const TodoTemplate: FC<Props> = ({ todo, deleteTodo }) => {
  const {
    id,
    title,
    completed,
  } = todo;

  return (
    <>
      <p>{title}</p>
      <p>{todo.user.name}</p>
      <p>{completed ? 'Completed' : 'Not complete'}</p>
      <button type="button" onClick={() => deleteTodo(id)}>
        Delete
      </button>
    </>
  );
};

const mapStateProps = (state: State) => ({
  todos: state.todos,
});

const mapDispatchProps = (dispatch: Dispatch) => ({
  deleteTodo: (id: number) => dispatch({
    type: DELETE_TODO,
    value: id,
  }),
});

export const Todo = connect(mapStateProps, mapDispatchProps)(TodoTemplate);
