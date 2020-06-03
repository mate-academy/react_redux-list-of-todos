import React from 'react';
import './App.scss';
import { useSelector } from 'react-redux';
import { TodosList } from './components/TodosList';
import { Loader } from './components/Loader';
import { getLoaded } from './store';
import { SortButtons } from './components/SortButtons';

const App = () => {
  const loaded = useSelector(getLoaded);

  return (
    <div className="container">
      <h1 className="row center-align">Dynamic list of TODOs</h1>
      {loaded ? (
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
          <Loader />
        </div>
      )}

    </div>
  );
};

export default App;
