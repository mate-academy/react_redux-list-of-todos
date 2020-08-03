import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { TodosWithUser } from '../../interfaces';
import TodoItem from '../TodoItem/TodoItem';

import {
  RootState,
  getTodos,
  getFilter,
} from '../../store';

const mapState = (state: RootState) => {
  return {
    todos: getTodos(state),
    filterType: getFilter(state),
  };
};

const getNewData = (title: string, data: TodosWithUser[]): TodosWithUser[] => {
  switch (title) {
    case 'Sort by title':
      return [...data].sort((todoA, todoB) => todoA.title.localeCompare(todoB.title));
    case 'Sort by completed':
      return [...data].sort((todoA, todoB) => Number(todoB.completed) - Number(todoA.completed));
    case 'Sort by name':
      return [...data].sort((todoA, todoB) => todoA.user.name.localeCompare(todoB.user.name));
    default:
      return data;
  }
};

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector> & {
  todos: TodosWithUser[];
};

const TodoList: React.FC<Props> = ({ todos, filterType }) => {
  const filtredList = getNewData(filterType, todos);

  return (
    <ul className="list">
      {filtredList.map(task => (
        <li key={task.id} className="listItem">
          <TodoItem todo={task} />
        </li>
      ))}
    </ul>
  );
};

export default connector(TodoList);
