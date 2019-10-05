import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoList from './components/TodoList/TodoList';

// functions
import {
  startLoading,
  handleSuccess,
  handleError,
  handleSort,
} from './store/store';
import getData from './api';
import getTodosWithUsers from './dataMappers';

// styles
import './App.css';

class App extends Component {
  loadDataFromServer = () => {
    const {
      start,
      handleOk,
      handleFail,
    } = this.props;
    start();

    Promise.all([
      getData('todos'),
      getData('users'),
    ])
      .then(([todos, users]) => {
        const todosListWithUsers = getTodosWithUsers(todos, users);
        handleOk(todosListWithUsers);
      })
      .catch(handleFail);
  }

  sortPosts = (event) => {
    const { value } = event.target;
    const { sortTodos } = this.props;
    sortTodos(value);
  }

  render() {
    const {
      sortedTodosList,
      isLoaded,
      isLoading,
      buttonText,
      isError,
    } = this.props;

    if (!isLoaded) {
      let errText = null;
      if (isError) {
        errText = <p>No Data :( Try again</p>;
      }
      return (
        <div>
          {errText}
          <button
            type="submit"
            disabled={isLoading}
            onClick={this.loadDataFromServer}
          >
            {buttonText}
          </button>
        </div>
      );
    }

    return (
      <div>
        <button
          value="name"
          type="submit"
          onClick={this.sortPosts}
        >
          Sort by Name
        </button>
        <button
          value="title"
          type="submit"
          onClick={this.sortPosts}
        >
          Sort by Title
        </button>
        <button
          value="completed"
          type="submit"
          onClick={this.sortPosts}
        >
          Sort by Comleted
        </button>
        <button
          type="submit"
          onClick={this.sortPosts}
        >
          Reset
        </button>
        <TodoList todos={sortedTodosList} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todosList: state.todosList,
  sortedTodosList: state.sortedTodosList,
  isError: state.isError,
  isLoaded: state.isLoaded,
  isLoading: state.isLoading,
  buttonText: state.buttonText,
});

const mapDispatchToProps = dispatch => ({
  start: () => dispatch(startLoading()),
  handleOk: todosList => dispatch(handleSuccess(todosList)),
  handleFail: () => dispatch(handleError()),
  sortTodos: typeOfSort => dispatch(handleSort(typeOfSort)),

});

App.propTypes = {
  sortTodos: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleFail: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  sortedTodosList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      completed: PropTypes.bool,
      user: PropTypes.shape({
        name: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
