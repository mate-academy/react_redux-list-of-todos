import React, { useState } from 'react';
import './App.css';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import { getTodos } from './redux/store';
import { todosFromServer } from './api/todos';
import { usersFromServer } from './api/users';

import TodoList from './TodoList';

const App = ({ todos, todosHandle }) => {
  const [isLoading, setLoading] = useState(false);

  const getDataFromServer = async() => {
    setLoading(true);

    const [todosData, usersData] = await Promise.all(
      [await todosFromServer(), await usersFromServer()]
    );

    todosHandle(todosData.map((todo) => {
      const user = usersData.find(person => todo.userId === person.id);

      return {
        ...todo,
        userName: user ? user.name : '',
      };
    }));

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>React + Redux list of TODOs</h1>
      {todos.length
        ? <TodoList />
        : (
          <button
            type="button"
            className="todo__button"
            onClick={() => getDataFromServer()}
          >
            {isLoading
              ? 'Loading...'
              : 'Load'
            }
          </button>
        )
      }
    </div>
  );
};

const getData = state => ({
  todos: state.todos,
});

const getMethods = dispatch => ({
  todosHandle: newTodos => dispatch(getTodos(newTodos)),
});

App.propTypes = {
  todos: PropsTypes.arrayOf.isRequired,
  todosHandle: PropsTypes.func.isRequired,
};

export default connect(getData, getMethods)(App);
