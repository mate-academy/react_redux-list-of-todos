import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';

import { loadTodos, getSortedTodos } from './redux/store';

import TodoList from './components/TodoList';

function App({ visibleTodos, sortField, isLoading, isLoaded }) {
  return (
    <div className="App">
      {!isLoaded
        ? (
          <button
            type="button"
            disabled={isLoading}
            onClick={loadTodos}
            className="button"
          >
            {isLoading ? (<>Loading...</>) : (<>Load Todos</>)}
          </button>
        )
        : (
          <>
            <TodoList todos={visibleTodos} filter={sortField} />
          </>
        )
      }
    </div>
  );
}

const mapStateToProps = state => ({
  visibleTodos: getSortedTodos(state),
  sortField: state.sortField,
  isLoading: state.isLoading,
  isLoaded: state.isLoaded,
  filterUsed: state.filterUsed,
});

const mapDispatchToProps = dispatch => ({
  setSortField: sortField => dispatch({
    type: 'SET_SORT_FIELD',
    sortField,
  }),
  setLoading: isLoading => dispatch({
    type: 'SET_LOADING',
    isLoading,
  }),
  setLoaded: isLoaded => dispatch({
    type: 'SET_LOADED',
    isLoaded,
  }),
  loadTodos: () => dispatch(loadTodos()),
});

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortField: PropTypes.objectOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
