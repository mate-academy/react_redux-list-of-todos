import React from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { TodosWithUser } from '../../interfaces';
import './TodoItem.css';

import {
  RootState,
  getTodos,
  deleteTodo,
} from '../../store';

const mapState = (state: RootState) => {
  return {
    todos: getTodos(state),
  };
};

const mapDispatch = {
  delete: deleteTodo,
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {
  todo: TodosWithUser;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    completed,
    title,
    user,
    id,
  } = todo;
  const dispatch = useDispatch();

  const onDelete = (todoId: number) => {
    const actionDelete = deleteTodo(todoId);

    dispatch(actionDelete);
  };

  return (
    <>
      <div className={completed ? 'done' : 'undone'} />
      <p className="task">
        {title}
      </p>
      <p className="person">
        {user.name}
      </p>
      <button
        onClick={() => onDelete(id)}
        className="delete-btn"
        type="button"
      >
        x
      </button>
    </>
  );
};

export default connector(TodoItem);
