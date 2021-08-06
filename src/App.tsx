import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';

import { getTodosFromServer, isUserSelected, startLoading } from './store';

import { TodoList } from './components/TodoList';
import { Filters } from './components/Filters';
import { CurrentUser } from './components/CurrentUser';


const App = () => {

  const dispatch = useDispatch();

  const userSelected: boolean = useSelector(isUserSelected);

  const fetchTodos = () => {
    dispatch(startLoading(true));
    return dispatch(getTodosFromServer());
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <h1>Redux list of todos</h1>

      <Filters />

      <div className="App__columns">        
        <TodoList />

        {userSelected ? (
          <CurrentUser />
        ) : 
          <p className="info pl-30">No user selected</p>}
      </div>
    </div>
  );
};

export default App;
