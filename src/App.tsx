import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosData } from './helpers/api';
import { setTodos } from './store/todos';
import { setLoading } from './store/loading';
import { TodoList } from './components/TodoList';
import { isLoading, isLoaded, getErrorMessage } from './store/';
import { setLoaded } from './store/loaded';
import { setErrorMessage } from './store/errorMessage';
import { Preloader } from './components/Preloader'


import './App.scss';
import LoadButton from './components/LoadButton';


const App = () => {
  const loaded = useSelector(isLoaded);
  const loading = useSelector(isLoading);
  const errorMessage = useSelector(getErrorMessage)
  const dispatch = useDispatch();

  const init = async() => {
    dispatch(setLoading(true));

    try {
      const todos = await getTodosData();
      dispatch(setTodos(todos));
      dispatch(setLoaded(true));
    } catch (error) {
      dispatch(setErrorMessage(`Sorry, something is wrong: ${error}`));
      dispatch(setLoaded(false));
    }

    dispatch(setLoading(false));
  };

  return (
    <div className="App">

      {(
        !loading && !loaded) && (
        <LoadButton title="Load" init={init} />
      )}
      {loading && !loaded && (
      <>

        <Preloader />
      </>)
      }
      {loaded
        && (errorMessage.length === 0)
        && (
          <>
            <h1>Redux list of todos</h1>
            <TodoList />
          </>
      )}

      {(errorMessage.length > 0) && (
        <h2>{errorMessage}</h2>
      )}

    </div>
  );
};

export default App;
