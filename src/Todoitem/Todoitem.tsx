import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { User } from '../User/User';
import { TodoWithUsers, State } from '../interfaces';
import { REMOVE_TODO } from '../const/const';

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
      <tr>
        <td>{id}</td>
        <td>{title}</td>
        <td className="state">{completed ? 'ready' : 'not ready'}</td>
        <td><User user={user} /></td>
        <button
          type="button"
          className="remove-button"
          onClick={() => removeTodo(id)}
        >
          x
        </button>
      </tr>
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

export const Todoitem = connect(mapStateToProps, mapDispatchToProps)(TodoTemplate);
