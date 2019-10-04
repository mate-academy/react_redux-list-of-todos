/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  startLoading,
  handleSuccess,
  handleError,
} from './store';
import TodoList from './components/TodoList/TodoList';
import getTodosWithUsers from './dataMappers';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/';

const getData = dataName => (
  fetch(`${API_URL}${dataName}`)
    .then(response => response.json())
);

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

  // sortPosts = (event) => {
  //   const { value } = event.target;

  //   this.setState((prevState) => {
  //     switch (value) {
  //       case 'name': return {
  //         sortedTodosList: [...prevState.todosList]
  //           .sort((todo1, todo2) => (
  //             todo1.user.name.localeCompare(todo2.user.name))),
  //       };
  //       case 'title': return {
  //         sortedTodosList: [...prevState.todosList]
  //           .sort((todo1, todo2) => todo1.title.localeCompare(todo2.title)),
  //       };
  //       case 'completed': return {
  //         sortedTodosList: [
  //           ...prevState.todosList.filter(todo => todo.completed),
  //           ...prevState.todosList.filter(todo => !todo.completed),
  //         ],
  //       };
  //       default: return {
  //         sortedTodosList: [...prevState.todosList],
  //       };
  //     }
  //   });
  // };

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
  sortedTodosList: state.todosList,
  isError: state.isError,
  isLoaded: state.isLoaded,
  isLoading: state.isLoading,
  buttonText: state.buttonText,
});

const mapDispatchToProps = dispatch => ({
  start: () => dispatch(startLoading()),
  handleOk: todosList => dispatch(handleSuccess(todosList)),
  handleFail: () => dispatch(handleError()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
