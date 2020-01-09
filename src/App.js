import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css';
import TodoList from './TodoList';
import getDataFromServer from './getDataFromServer';
import { startLoading, handleSuccess } from './store';

const urlTodos = 'https://jsonplaceholder.typicode.com/todos';
const urlUser = 'https://jsonplaceholder.typicode.com/users';

// eslint-disable-next-line no-shadow
const App = ({ todos, isLoading, startLoading, handleSuccess }) => {
  const [contentHidden, setContentHidden] = useState(false);
  const [selectedButton, setValueButton] = useState('');

  const loadAll = async() => {
    startLoading();

    const [todosArr, usersArr] = await
    Promise.all([getDataFromServer(urlTodos), getDataFromServer(urlUser)]);

    const usersAndTodos = todosArr.map(todo => ({
      ...todo,
      user: usersArr.find(human => human.id === todo.userId),
    }));

    handleSuccess(usersAndTodos);
    setContentHidden(true);
  };

  const sortTodos = (x) => {
    switch (x) {
      case 'title':
        if (x !== selectedButton) {
          handleSuccess([...todos]
            .sort((a, b) => a.title.localeCompare(b.title)));
          setValueButton(x);
        }
        break;

      case 'name':
        if (x !== selectedButton) {
          handleSuccess([...todos]
            .sort((a, b) => a.user.name.localeCompare(b.user.name)));
          setValueButton(x);
        }
        break;

      case 'progress':
        if (x !== selectedButton) {
          handleSuccess([...todos]
            .sort((a, b) => a.completed - b.completed));
          setValueButton(x);
        }
        break;
      default: handleSuccess([...todos]);
    }

    if (x === selectedButton) {
      const sortTitle = [...todos].reverse();

      handleSuccess(sortTitle);
    }
  };

  const deleteTodo = (id) => {
    handleSuccess(todos.filter(item => item.id !== id));
  };

  return (
    <section className="listTodos">
      <h1 className="listTodos__title">Dynamic list of todos</h1>
      <section>
        {!contentHidden ? (
          <button type="button" onClick={loadAll} className="button">
            {!isLoading ? 'Load All' : 'Is loading...' }
          </button>
        ) : (
          <TodoList
            todos={todos}
            sortTodos={sortTodos}
            deleteTodo={deleteTodo}
          />
        )
        }
      </section>
    </section>
  );
};

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  startLoading: PropTypes.func.isRequired,
  handleSuccess: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  todos: state.todos,
  isLoading: state.isLoading,
});

const mapDispatchToProps = dispatch => ({
  startLoading: () => dispatch(startLoading()),
  handleSuccess: todos => dispatch(handleSuccess(todos)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
