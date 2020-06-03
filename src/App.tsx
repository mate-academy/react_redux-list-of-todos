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
  const isButtonHidden = useSelector(setUnvisibleButton);

  const downloadData = () => {
    dispatch(startLoading());

    getDataFromServer()
      .then((todos) => dispatch(finishLoading('Load Success', todos)));
  };

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      {isButtonHidden && (
        <button
          className="button"
          type="button"
          onClick={downloadData}>
          Load
        </button>
      )}
      {loading ? 'Loading...' : !isButtonHidden && <TodoList />}
    </div>
  );
};

export default App;
