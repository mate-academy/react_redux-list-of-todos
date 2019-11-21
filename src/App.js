import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import { Button } from 'semantic-ui-react';
import TodoList from './components/table/TodoList';
import { getData } from './api/api';

import {
  startLoading,
  handleError,
  handleSuccess,
  handleSort,
} from './store/store';

class App extends React.Component {
  getData = () => {
    const {
      initLoad,
      loadSuccess,
      catchError,
    } = this.props;

    const usersUrl = 'https://jsonplaceholder.typicode.com/users';
    const todosUrl = 'https://jsonplaceholder.typicode.com/todos';

    initLoad();

    Promise.all([getData(usersUrl), getData(todosUrl)])
      .then(([users, todos]) => {
        const todosWithUsers = todos.map(todo => ({
          ...todo,
          user: users.find(item => item.id === todo.userId),
        }));
        loadSuccess(todosWithUsers);
      })
      .catch(() => {
        catchError();
      });
  };

  render() {
    const {
      todosWithUsers,
      isLoading,
      hasError,
      sortTodos,
    } = this.props;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (hasError) {
      return (
        <>
          <p>Loading failed</p>
          <Button type="button" onClick={this.getData}>Retry</Button>
        </>
      );
    }

    if (!todosWithUsers.length) {
      return <Button type="button" onClick={this.getData}>Load</Button>;
    }

    return (
      <TodoList
        todos={todosWithUsers}
        sort={sortTodos}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  todosWithUsers: state.todosWithUsers,
  hasError: state.hasError,
  sortedTodos: state.sortedTodos,
});

const mapDispatchToProps = dispatch => ({
  initLoad: () => dispatch(startLoading()),
  loadSuccess: todosWithUsers => dispatch(handleSuccess(todosWithUsers)),
  catchError: () => dispatch(handleError()),
  sortTodos: sort => dispatch(handleSort(sort)),
});

App.propTypes = {
  initLoad: PropTypes.func.isRequired,
  loadSuccess: PropTypes.func.isRequired,
  catchError: PropTypes.func.isRequired,
  sortTodos: PropTypes.func.isRequired,
  todosWithUsers: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.number,
    }).isRequired,
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
