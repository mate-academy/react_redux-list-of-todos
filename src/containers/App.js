import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { connect } from 'react-redux';
import { todosWithUsersFetchData } from '../actions/todosWithUsers';
import TodoList from '../components/TodoList';

class App extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    isDataLoaded: PropTypes.bool.isRequired,
    isLoadingStart: PropTypes.bool.isRequired,
    todosWithUsers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string,
    })).isRequired,
  }

  componentDidUpdate() { }

  render() {
    const {
      isDataLoaded, isLoadingStart, fetchData, todosWithUsers,
    } = this.props;

    if (!isDataLoaded) {
      return isLoadingStart
        ? (
          <div className="app">
            <h1>Todos</h1>
            <button
              type="button"
              className="button"
              disabled
            >
              ...Loading
            </button>
          </div>
        )
        : (
          <div className="app">
            <h1>Todos</h1>
            <button
              type="button"
              className="button"
              onClick={fetchData}
            >
              Load
            </button>
          </div>
        );
    }

    return (
      <div className="app">
        <h1>Todos</h1>
        <TodoList preparedTodos={todosWithUsers} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todosWithUsers: state.todosWithUsers.todosWithUsers,
  isDataLoaded: state.todosWithUsers.isDataLoaded,
  isLoadingStart: state.todosWithUsers.isLoadingStart,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(todosWithUsersFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
