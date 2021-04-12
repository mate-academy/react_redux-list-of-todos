import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import './App.scss';
import { Filters } from './components/Filters';
import { UserInfo } from './components/UserInfo';
import { TodoList } from './components/TodoList';
import { ErrorOnLoad } from './components/ErrorOnLoad';
import { NoUserSelected } from './components/NoUserSelected';
import {
  getTodosfromServer, isErrorTodo, setQuery, isErrorUser,
} from './store';

const App = () => {
  const dispatch = useDispatch();
  const isTodosLoadError = useSelector(isErrorTodo);
  const isUserLoadError = useSelector(isErrorUser);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryFromURL = searchParams.get('query') || '';

  const fetchTodos = () => {
    return dispatch(getTodosfromServer());
  };

  useEffect(() => {
    dispatch(setQuery(queryFromURL));
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <h1>Redux list of todos</h1>
        {isUserLoadError === false
          ? (<UserInfo />)
          : <NoUserSelected />}
        <Filters />
        { isTodosLoadError === false
          ? <TodoList />
          : <ErrorOnLoad /> }
      </div>
    </div>
  );
};

export default App;
