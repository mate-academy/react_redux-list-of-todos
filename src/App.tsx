import React from 'react';
import './App.scss';
import { useSelector } from 'react-redux';
import { TodosList } from './components/TodosList';
import { LoadButton } from './components/LoadButton';
import { getLoaded, getError } from './store';
import { SortButtons } from './components/SortButtons';

const App = () => {
  const loaded = useSelector(getLoaded);
  const error = useSelector(getError);
  console.log(error);

  return (
    <div className="container">
      <h1 className="row center-align">Dynamic list of TODOs</h1>
      {(loaded && !error) ? (
        <>
          <div className="row center-align">
            <SortButtons />
          </div>
          <div className="row">
            <div className="col s6 offset-s3">
              <TodosList />
            </div>
          </div>
        </>
      ) : (
        <div className="row center-align">
          <LoadButton />
          <p>{error}</p>
        </div>
      )}

    </div>
  );
};

export default App;
