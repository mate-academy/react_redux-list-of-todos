import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import {
  dataLoading,
  dataSortTitle,
  dataSortCompleted,
  dataSortName,
  startLoading,
  finishLoading,
  getLoaded,
  isLoading as dataIsLoading,
} from './store';
import TodoList from './components/TodoList';
import { loadTodosWithUsers } from './components/api';

const App: React.FC = () => {
  const isLoaded = useSelector(getLoaded);
  const isLoading = useSelector(dataIsLoading);

  const dispatch = useDispatch();

  const handleButtonClick = async () => {
    dispatch(startLoading());

    await loadTodosWithUsers().then(data => {
      dispatch(dataLoading(data));
    });

    dispatch(finishLoading());
  };

  const sortByTitle = () => {
    dispatch(dataSortTitle());
  };

  const sortByCompleted = () => {
    dispatch(dataSortCompleted());
  };

  const sortByName = () => {
    dispatch(dataSortName());
  };

  return (
    <div className="App">
      <h1>Static list of todos</h1>
      {!isLoaded ? (
        <>
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={isLoading}
          >
            {isLoading ? 'loading...' : 'Load'}
          </button>
        </>
      ) : (
        <>
          <div className="controls">
            <button type="button" className="controls__button" onClick={sortByTitle}>Sort by Title</button>
            <button type="button" onClick={sortByCompleted}>Sort by Completed</button>
            <button type="button" onClick={sortByName}>Sort by Name</button>
          </div>
          <div className="content">
            <TodoList />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
