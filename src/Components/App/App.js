import React from 'react';
import './App.css';
import { ToDoList } from '../ToDoList';
// import { store, loading, getData } from '../../store';

const App = ({ dataLoading, todos, isLoading }) => (
  <div className="App">
    <h1>Dynamic list of todos</h1>
    {todos.length === 0 ? (
      <button type="button" onClick={dataLoading} className="btn btn-info">
        {isLoading ? (
          <span className="spinner-border spinner-border-sm" />
        ) : (
          <span>Load</span>
        )}
        {' '}
      </button>
    ) : (
      <ToDoList />
    )}
  </div>
);

export default App;
