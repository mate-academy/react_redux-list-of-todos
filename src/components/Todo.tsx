import React, { FC } from 'react';
import { connect } from 'react-redux';

interface Props {
  id: number;
  title: string;
  completed: boolean;
  user?: User;
  setDeteteTodo: (id: number) => void;
}

const TodoTemplate: FC<Props> = ({
  id, title, completed, user, setDeteteTodo,
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
        onClick={() => setDeteteTodo(id)}
      >
X
      </button>
    </>
  );
};

const mapStateToProps = (state: GlobalState) => ({
  ...state,
});

const mapDispatchToProps = (dispatch: (arg0: { type: string; index: number }) => unknown) => {
  return {
    setDeteteTodo: (id: number) => dispatch({ type: 'DELETE_TODO', index: id }),
  };
};


export const Todo = connect(mapStateToProps, mapDispatchToProps)(TodoTemplate);
