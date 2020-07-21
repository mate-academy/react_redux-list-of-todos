import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import {
  RootState, startLoading, setTodos, getTodos,
} from '../store';
import { getData, URLTodos, URLUsers } from '../Api';
import { User, Todo, TodoWithUser } from '../interfaces';

const mapState = (state: RootState) => {
  return {
    todosList: getTodos(state),
  };
};

const mapDispatch = {
  load: startLoading,
  initTodos: setTodos,
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {
  title?: string;
};

const Start: React.FC<Props> = ({ load, initTodos }) => {
  const getTodoList = async () => {
    load();
    const todos = await getData<Todo>(URLTodos);
    const users = await getData<User>(URLUsers);

    function findUserById(id: number) {
      const person = users.find(user => user.id === id);

      return (person) ? person.name : '';
    }

    const list: TodoWithUser[] = todos.map(todo => {
      return {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        user: findUserById(todo.userId),
      };
    });

    load();
    initTodos(list);
  };

  return (
    <button
      className="btn btn-dark ml shadow p-3 mb-5  rounded"
      type="button"
      onClick={getTodoList}
    >
      Load todos
    </button>
  );
};

export default connector(Start);
