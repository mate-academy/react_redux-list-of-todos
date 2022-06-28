import React, { useEffect, useState } from 'react';
import './AddTodoForm.scss';

import { useDispatch } from 'react-redux';
import { addTodoAction } from '../../store/actions';
import { addTodo } from '../../api/todos';
import { getAllUsers } from '../../api/users';

import { Todo, User } from '../../react-app-env';

export const AddTodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllUsers()
      .then(usersFromServer => setUsers(usersFromServer));
  }, []);

  const handleEvent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: Todo = {
      title,
      userId: selectedUserId,
      completed: false,
    };

    const response = await addTodo(newTodo);

    dispatch(addTodoAction(response));

    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <form onSubmit={handleEvent}>
      <input
        type="text"
        className="TodoList__input TodoList__input--add"
        placeholder="Add a new Todo"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />

      <select
        value={selectedUserId}
        className="TodoList__select"
        onChange={(event) => {
          setSelectedUserId(+event.target.value);
        }}
      >
        <option
          value="0"
          disabled
        >
          Choose a user
        </option>

        {users.map(user => (
          <option
            value={user.id}
            key={user.id}
          >
            {user.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="
        TodoList__user-button
        TodoList__user-button--selected
        TodoList__user-button--random
        button
      "
      >
        Add Todo
      </button>
    </form>
  );
};
