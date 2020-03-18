import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import { getPreparedTodos } from './api';
import { setTodosAction } from './actionCreators';

interface Props {
  setTodos: (todos: PreparedTodo[]) => void;
}

const App: FC<Props> = ({ setTodos }) => {
  const [isLoaded, setLoad] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleLoad = () => {
    setLoading(true);
    getPreparedTodos().then(newTodos => {
      setTodos(newTodos);
      setLoad(true);
      setLoading(false);
    });
  };

  return (
    <div className="app">
      {isLoaded
        ? (
          <TodoList />
        )
        : (
          <div className="primary-show">
            <h1>Redux TODOs</h1>
            <button
              className="btn btn-warning btn-lg"
              type="button"
              onClick={handleLoad}
            >
              {!isLoading ? <span>Load</span> : <span>Loading...</span>}
            </button>
          </div>
        )}
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTodos: (todos: PreparedTodo[]) => dispatch(setTodosAction(todos)),
});

export default connect(null, mapDispatchToProps)(App);
