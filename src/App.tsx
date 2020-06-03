import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoLIst';

import './App.scss';

import {
  isLoading,
  startLoading,
  finishLoading,
  setUnvisibleButton,
} from './store';
import { getDataFromServer } from './api';


const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const hideButton = useSelector(setUnvisibleButton);

  const downLoadData = () => {
    dispatch(startLoading());

    getDataFromServer()
      .then((todos) => dispatch(finishLoading('Load Success', todos)));
  };

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      {hideButton && (
        <button
          className="button"
          type="button"
          onClick={downLoadData}>
          Load
        </button>
      )}
      {loading ? 'Loading...' : !hideButton && <TodoList />}
    </div>
  );
};

export default App;
