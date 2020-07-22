import React from 'react';
import { connect } from 'react-redux';

import {
  RootState, startLoading, setTodos, getTodos,
} from '../store';
import { getData, TODOS_URL, USERS_URL } from '../Api';
import { User, Todo, TodoWithUser } from '../interfaces';

type Props = {
  isLoading: () => (void);
  initTodos: (todos: TodoWithUser[]) => (void);
};

const Start: React.FC<Props> = ({ isLoading, initTodos }) => {
  const getTodoList = async () => {
    isLoading();
    const todos = await getData<Todo>(TODOS_URL);
    const users = await getData<User>(USERS_URL);

    function findUserById(id: number) {
      const person = users.find(user => user.id === id);

      return person ? person.name : '';
    }

    const list: TodoWithUser[] = todos.map(todo => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      user: findUserById(todo.userId),
    }));

    isLoading();
    initTodos(list);
  };

  return (
    <button
      className="btn btn-dark ml shadow p-3 mb-5 rounded"
      type="button"
      onClick={getTodoList}
    >
      Load todos
    </button>
  );
};

const mapState = (state: RootState) => ({
  todosList: getTodos(state),
}
);

const mapDispatch = {
  isLoading: startLoading,
  initTodos: setTodos,
};

const connector = connect(mapState, mapDispatch);

export default connector(Start);
