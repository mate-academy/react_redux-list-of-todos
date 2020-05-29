import React from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { LoadSpinner } from './components/LoadSpinner';
import {
  isLoading, getLoaded
} from './store';
import { setTodos } from './store/todos';
import { setLoaded } from './store/loaded';
import { getData } from './helpers/getData';
import { loadProcess } from './store/loading';
import { ListTodos } from './components/TodosList';
import { DowloadButton } from './components/DowloadButton';

const App = () => {
  const loading = useSelector(isLoading);
  const loaded = useSelector(getLoaded);
  const dispatch = useDispatch();

  const loadData = () => {
    dispatch(loadProcess(true));

    getData()
      .then(data => {
        dispatch(setTodos(data as Todo[]));
        dispatch(setLoaded());
      })
      .finally(() => dispatch(loadProcess(true)));
  };

  return (
    <>
      <div className="App">
        <h1 className="App__title">Redux list of todos</h1>
        {!loaded && <DowloadButton loadData={loadData} />}
        {loading && <LoadSpinner />}
        {loaded && <ListTodos />}
      </div>
    </>
  );
};

export default App;
