import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  isLoading, startLoading, setTodos,
} from '../store';
import { Todo, User } from './Interfaces';
import { getData } from '../api/getData';

const API_TODOS = 'https://mate.academy/students-api/todos';
const API_USERS = 'https://mate.academy/students-api/users';

type Props = {
  title: string;
};

export const Start: React.FC<Props> = ({ title }) => {
  const dispatch = useDispatch(); // it is a link to `store.dispatch` method
  const loading = useSelector(isLoading); // we pass a link to selector function here

  const handleClick = async () => {
    dispatch(startLoading());

    const todos = await getData<Todo>(API_TODOS);
    const users = await getData<User>(API_USERS);

    const todosWithUser: Todo[] = todos.map((todo: Todo) => {
      const todoCopy = { ...todo };
      const neededUser: User | undefined = users.find(user => user.id === todo.userId);

      todoCopy.userName = neededUser ? neededUser.name : '';

      return todoCopy;
    });

    dispatch(setTodos(todosWithUser));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
    >
      {title}
    </button>
  );
};
