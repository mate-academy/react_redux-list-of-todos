import React from 'react';
import PropTypes from 'prop-types';
import TodoList from '../components/TodoList/TodoList';
import './App.css';

function App(props) {
  const {
    data,
    isLoading,
    getData,
    sortData,
    completeData,
  } = props;
  if (isLoading) {
    return (
      <div className="app">
        <p>Loading ...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="start">
        <button
          className="start-button"
          type="button"
          onClick={getData}
        >
          Show
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Dynamic list of todos</h1>
      <button
        className="button-sort"
        type="button"
        onClick={sortData}
      >
        Task
      </button>
      <button
        className="button-sort"
        type="button"
        onClick={completeData}
      >
        Complete
      </button>
      <TodoList
        dataFromServer={data}
      />
    </div>
  );
}

App.propTypes = {
  data: PropTypes.arrayOf().isRequired,
  isLoading: PropTypes.bool.isRequired,
  getData: PropTypes.func.isRequired,
  sortData: PropTypes.func.isRequired,
  completeData: PropTypes.func.isRequired,
};

export default App;
