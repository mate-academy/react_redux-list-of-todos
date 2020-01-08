import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import getTodosWithUsers from './GetTodosWithUsers';
import store from './store';
import getURL from './api/getUrl';

function Main({ todosAndUsers, setTodosAndUsers }) {
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const preparedTodos
  = getTodosWithUsers(todosAndUsers[0], todosAndUsers[1]);

  const LoadTodosAndUsers = async() => {
    setIsLoading(true);

    const [usersObject, todosObject]
    = await Promise.all([
      getURL('https://jsonplaceholder.typicode.com/users'),
      getURL('https://jsonplaceholder.typicode.com/todos'),
    ]);

    setTodosAndUsers([todosObject, usersObject]);
    setIsLoading(false);
    setLoaded(true);
  };

  if (isLoading === true) {
    return (
      <div className="App">
        <p> ...LOADING </p>
      </div>
    );
  }

  if (loaded === false) {
    return (
      <div className="App">
        <button type="button" onClick={LoadTodosAndUsers}>
          Load
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <TodoList todos={preparedTodos} />
    </div>
  );
}

const mapStateToProps = state => ({
  todosAndUsers: state.todosAndUsers,
});

const dataMethods = () => ({
  setTodosAndUsers: newTodosAndUsers => store.dispatch({
    type: 'CHANGE_ROW',
    todosAndUsers: newTodosAndUsers,
  }),
});

Main.propTypes = {
  todosAndUsers: PropTypes.arrayOf(PropTypes.any).isRequired,
  setTodosAndUsers: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, dataMethods)(Main);
