import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setTodos,
  setFilterQuery,
  setTypeTodos,
  setUserId,
  setActiveTodoId,
  setCompletedTodo,
} from './store';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import './App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const {
    todos,
    typeOfTodos,
    filterQuery,
    selectedUserId,
  } = useSelector((state: RootState) => state);
  const [visualizedTodos, setVisualizedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setVisualizedTodos(todos);
  }, [todos]);

  useEffect(() => {
    dispatch(setTodos());
  }, []);

  const setFilterValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterQuery(target.value));
  };

  const setShowTodos = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTypeTodos(target.value));
  };

  const setSelectedUserId = (event: React.MouseEvent, userId: number, id: number) => {
    event.preventDefault();

    dispatch(setUserId(userId));
    dispatch(setActiveTodoId(id));
  };

  const handleCompletedTodo = ({ target }: React.ChangeEvent<HTMLInputElement>, id: number) => {
    dispatch(setCompletedTodo(target.checked, id));
  };

  const handleShuffleTodos = (event: React.MouseEvent) => {
    event.preventDefault();

    setVisualizedTodos([...visualizedTodos]
      .sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    let newTodos;

    switch (typeOfTodos) {
      case 'active':
        newTodos = todos.filter(({ completed }) => !completed);
        break;

      case 'completed':
        newTodos = todos.filter(({ completed }) => completed);
        break;

      default:
        newTodos = todos;
        break;
    }

    const lowerQuery = filterQuery.toLowerCase();

    setVisualizedTodos(newTodos
      .filter(({ title }) => title?.toLowerCase()
        .includes(lowerQuery)));
  }, [typeOfTodos, filterQuery]);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={visualizedTodos}
          handleShuffleTodos={handleShuffleTodos}
          handleShowTodos={setShowTodos}
          handleFilterQuery={setFilterValue}
          handleClick={setSelectedUserId}
          handleChange={handleCompletedTodo}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              handleClick={setSelectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
