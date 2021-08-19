import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import { getTodosFromServer, isUserSelected, setLoading } from './store';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';


const App = () => {
  const dispatch = useDispatch();

  const userSelected: boolean = useSelector(isUserSelected);

  const fetchTodos = () => {
    dispatch(setLoading(true));
    return dispatch(getTodosFromServer());
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>
      <div className="App__content">
        <div className="App__content-container">
          {userSelected ? (
            <CurrentUser />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
