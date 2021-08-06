import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';

import { getTodosFromServer, isErrorUser } from './store'; // isLoading

import { TodoList } from './components/TodoList';
import { Filters } from './components/Filters';
import { CurrentUser } from './components/CurrentUser';


const App = () => {
  // const loading = useSelector(isLoading);
  // const message = useSelector(getMessage) || 'Ready!';

  const dispatch = useDispatch();

  const isUserLoadError: boolean = useSelector(isErrorUser);

  const fetchTodos = () => {
    return dispatch(getTodosFromServer());
  };

  useEffect(() => {
    console.log('useEffect App', isUserLoadError);
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <h1>Redux list of todos</h1>

      <Filters />

      <div className="App__columns">        
        <TodoList />

        {isUserLoadError === false ? (
          <CurrentUser />
        ) : 
          <p className="warning pl-30">No user selected</p>}
      </div>
    </div>
  );
};

export default App;
