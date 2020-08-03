import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { TodosWithUser } from '../../interfaces';
import './TodoItem.css';

import {
  RootState,
  getTodos,
} from '../../store';

const mapState = (state: RootState) => {
  return {
    todos: getTodos(state),
  };
};

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector> & {
  todo: TodosWithUser;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { completed, title, user } = todo;

  return (
    <>
      <div className={completed ? 'done' : 'undone'} />
      <p className="task">
        {title}
      </p>
      <p className="person">
        {user.name}
      </p>
    </>
  );
};

export default connector(TodoItem);
