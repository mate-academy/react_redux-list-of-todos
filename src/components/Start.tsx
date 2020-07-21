/* eslint-disable no-console */
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import {
  RootState, isLoading, startLoading, setTodos, getTodos,
} from '../store';
import { getData, URLTodos, URLUsers } from '../Api';
import { User, Todo, TodoWithUser } from '../interfaces';

const mapState = (state: RootState) => {
  return {
    todosList: getTodos(state),
    loading: isLoading(state),
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

const Start: React.FC<Props> = ({ load, loading, initTodos }) => {
  const getTodoList = async () => {
    load();
    const todos = await getData<Todo>(URLTodos);
    const users = await getData<User>(URLUsers);

    function findUserById(id: number) {
      return users.find(user => user.id === id)?.name;
    }

    const list: TodoWithUser[] = todos.map(todo => {
      return {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        user: findUserById(todo.userId),
      };
    });

    initTodos(list);
  };

  return (
    <button
      type="button"
      onClick={getTodoList}
      disabled={loading}
    >
      {loading ? 'loading' : 'load'}
    </button>
  );
};

export default connector(Start);
