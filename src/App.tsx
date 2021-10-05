import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setTodos,
  setFilterQuery,
  setTypeTodos,
  setUserId,
  setActiveTodoId,
  setCompletedTodo,
  changeTheOrderOfTodos,
  filterTodos,
} from './store';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import './App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const {
    visualizedTodos,
    typeOfTodos,
    filterQuery,
    selectedUserId,
  } = useSelector((state: RootState) => state);

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

    dispatch(changeTheOrderOfTodos());
  };

  useEffect(() => {
    dispatch(filterTodos({ typeOfTodos, filterQuery }));
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
