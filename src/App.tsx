// import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import './App.scss';
import { fetchTodos } from './asyncActions/todos';
import TodoList from './components/TodoList/TodoList';
import User from './components/User/User';

import 'bulma/css/bulma.min.css';

const AppWrapper = styled.div`
width: 100%;
min-height: 100vh;
padding: 2rem;
background: #ff9063;
`;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <AppWrapper>
      <div className="App">
        <h1 className="title">Redux list of todos</h1>
        <div className="app__content">
          <TodoList />
          <User />
        </div>
      </div>
    </AppWrapper>
  );
};

export default App;
