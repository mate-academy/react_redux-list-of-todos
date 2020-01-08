import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style/index.css';
import { getData } from './store';
import TodoList from './components/TodoList';

const App = ({ data, isLoading, getTodoList }) => {
  if (isLoading) {
    return (
      <div className="loader">
        <div className="spinner" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="App">
        <h1 className="heading">Redux List of Todos</h1>
        <button
          className="btn"
          type="button"
          onClick={getTodoList}
        >
          Load Todos
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1 className="heading">Redux List of Todos</h1>
      <TodoList />
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.data,
  isLoading: state.isLoading,
});

const mapDispatchToMethod = dispatch => ({
  getTodoList: () => dispatch(getData()),
});

App.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  getTodoList: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToMethod)(App);
