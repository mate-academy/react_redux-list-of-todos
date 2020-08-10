import React from 'react';
import { connect } from 'react-redux';
import {
  RootState, toggleLoading, setTodos, getTodos,
} from '../../store';
import { getData } from '../../api';
import { Todo, User } from '../../interfaces';

type Props = {
  loaderToggler: () => void;
  todosSetter: (todos: Todo[]) => void;
};

const Start: React.FC<Props> = ({ loaderToggler, todosSetter }) => {
  const getAllTodos = async () => {
    loaderToggler();

    const todos = await getData<Todo>('todos');
    const users = await getData<User>('users');

    const todosWithUsers: Todo[] = todos.map(todo => (
      {
        ...todo,
        user: users.find(user => user.id === todo.userId),
      }
    ));

    todosSetter(todosWithUsers);
    loaderToggler();
  };

  return (
    <button
      className="btn btn-outline-dark"
      type="button"
      onClick={getAllTodos}
    >
      Load todos
    </button>
  );
};

const mapState = (state: RootState) => ({
  todos: getTodos(state),
});

const mapDispatch = {
  loaderToggler: toggleLoading,
  todosSetter: setTodos,
};

export default connect(mapState, mapDispatch)(Start);
