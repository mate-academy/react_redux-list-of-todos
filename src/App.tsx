import React, { FC, useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { TodoType, UserType, TodoWithUsers } from './types';
import { getUsers, getTodos } from './api';

const App: FC = () => {
  const [todos, setTodos] = useState<TodoWithUsers[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<TodoWithUsers[]>([...todos]);
  const [isLoading, setLoading] = useState(false);


  const showTodos = async () => {
    setLoading(true);

    const [todosFromServer, users] = await Promise.all(
      [getTodos(), getUsers()],
    );

    const preparedTodos = todosFromServer.map((todo: TodoType) => {
      const user = users.find((person: UserType) => person.id === todo.userId) as UserType;

      return {
        ...todo,
        user,
      };
    });

    setTodos(preparedTodos);
    setLoading(false);
    setFilteredTodos(preparedTodos);
  };

  const filter = (typeOfFilter: string) => {
    switch (typeOfFilter) {
      case 'sortByTitle':
        setFilteredTodos([...todos]
          .sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case 'sortByName':
        setFilteredTodos([...todos]
          .sort((a, b) => a.user.name.localeCompare(b.user.name)));
        break;
      case 'sortByCompleted':
        setFilteredTodos([...todos]
          .sort((a, b) => b.completed.toString()
            .localeCompare(a.completed.toString())));
        break;
      default:
    }
  };

  if (!todos.length) {
    return (
      <button
        className="start-button"
        type="button"
        onClick={showTodos}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Start Load'}
      </button>
    );
  }

  return (
    <div className="App">
      <h1 className="title">Static list of todos</h1>
      <div className="buttons">
        <button
          className="button"
          type="button"
          onClick={() => filter('sortByTitle')}
        >
          Sort by title
        </button>
        <button
          className=" button"
          type="button"
          onClick={() => filter('sortByName')}
        >
          Sort by name
        </button>
        <button
          className="button"
          type="button"
          onClick={() => filter('sortByCompleted')}
        >
          Sort by completed
        </button>
      </div>
      <TodoList todos={filteredTodos} />
    </div>
  );
};

export default App;
