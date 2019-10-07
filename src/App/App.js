import React from 'react';
import './App.css';
import { TodoList } from '../components/TodoList';
import { AppPropTypes } from '../constants/proptypes';

const App = ({
  isLoaded,
  isLoading,
  hasError,
  loadTodos,
}) => (
  <>
    <h1 className="header">Static list of todos</h1>
    {isLoaded ? (
      <div>
        <TodoList />
      </div>
    ) : (
      <>
        {hasError && (
          <h2 className="error-title">Oh, failed, try again</h2>
        )}
        <button
          type="button"
          className="load-button"
          onClick={loadTodos}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load todos'}
        </button>
      </>
    )}
  </>
);

App.propTypes = AppPropTypes;

export default App;
