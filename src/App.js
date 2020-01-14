import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadTodos, getIsLoading, getTodos, getHasError } from './store';
import './App.scss';
import TodoList from './TodoList';

const App = (props) => {
  const { load, isLoading, hasError, todosCount } = props;

  const loadData = async() => {
    await load();
  };

  if (hasError) {
    return (
      <p className="error-message">Oops, something went wrong!</p>
    );
  }

  return (
    <div className="App">
      {!todosCount ? (
        <>
          <button
            className="button button_load"
            type="button"
            onClick={loadData}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        </>
      ) : (
        <>
          <h1 className="table__heading">Dynamic list of todos</h1>
          <TodoList />
        </>
      )
      }
    </div>
  );
};

App.propTypes = {
  load: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  todosCount: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  hasError: getHasError(state),
  todosCount: getTodos(state).length,
});

export default connect(mapStateToProps, { load: loadTodos })(App);
