import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../redux/actions';

interface Props {
  id: number;
  title: string;
  completed: boolean;
  user?: User;
  setDeleteTodo: (id: number) => void;
}

const TodoTemplate: FC<Props> = ({
  id, title, completed, user, setDeleteTodo,
}) => {
  return (
    <>
      <p className="title">{`${id} ${title}`}</p>
      {completed
        ? (<p className="completed">Yes</p>)
        : (<p className="not-completed">No</p>)}
      {user && (<p>{user.name}</p>)}
      <button
        type="button"
        className="button--close"
        onClick={() => setDeleteTodo(id)}
      >
        X
      </button>
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setDeleteTodo: (id: number) => dispatch(
      actions.setDeleteTodo(id),
    ),
  };
};

export const Todo = connect(null, mapDispatchToProps)(TodoTemplate);
