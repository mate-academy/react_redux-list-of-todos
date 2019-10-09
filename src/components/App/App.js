import React from 'react';

import PropTypes from 'prop-types';
import TodoList from '../TodoList/TodoList';

class App extends React.Component {
  loadDatas = () => {
    const {
      startLoading, handleSuccess, handleError,
    } = this.props;

    startLoading();

    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(users => users.json()),
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(todos => todos.json()),
    ])
      .then(([users, todos]) => {
        const todosWithUsers = todos.map(todo => ({
          ...todo,
          user: users.find(user => user.id === todo.userId),
        }));
        handleSuccess(todosWithUsers);
      })
      .catch(() => {
        handleError();
      });
  }

  render() {
    const {
      todosWithUsers,
      isLoading,
      hasError,
      disabled,
      handleSort,
    } = this.props;

    const sortedTodos = todosWithUsers;
    if (isLoading) {
      return (<p>Loading...</p>);
    }

    if (hasError) {
      return (
        <>
          <p>Error priexal!</p>
          <button type="button" onClick={this.loadDatas}>Try again</button>
        </>
      );
    }

    return (
      <>
        <h1 className="h1">Dynamic list of todos</h1>
        {!disabled
          ? (
            <button
              onClick={this.loadDatas}
              className="button-start"
              type="button"
            >
              Load
            </button>
          )
          : (
            <select onChange={(e) => {
              handleSort(e.target.value);
            }}
            >
              <option value="Sorting" selected hidden>Sorting</option>
              <option value="By user">By user</option>
              <option value="By title">By title</option>
              <option value="By status">By status</option>
            </select>
          )
        }
        <TodoList todos={sortedTodos} />
      </>
    );
  }
}

App.propTypes = {
  handleSuccess: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  startLoading: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
  todosWithUsers: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.number,
    }).isRequired,
  ).isRequired,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
  disabled: PropTypes.bool,
};

App.defaultProps = {
  hasError: false,
  isLoading: false,
  disabled: false,
};

export default App;
