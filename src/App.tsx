import React, { useState, FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import TodosList from './components/TodosList/TodosList';
import { getUsers, getTodos } from './api';
import { SET_TODOS } from './constants';
import './App.css';

interface Props {
  todos: Todos | [];
  setTodos: (todosWithUsers: Todos) => void;
}

const App: FC<Props> = ({ todos, setTodos }) => {
  const [isLoading, setLoading] = useState(false);

  const loadTodos = async () => {
    setLoading(true);
    const [todosLoaded, users] = await Promise.all([getTodos(), getUsers()]);

    const todosWithUsers = todosLoaded.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId) as User,
    }));

    setTodos(todosWithUsers);
  };

  if (!isLoading) {
    return (
      <>
        <button
          type="button"
          className="btn-load"
          onClick={loadTodos}
          disabled={isLoading}
        >
          Load
        </button>
        {
          isLoading && (
            <p className="text">Loading...</p>
          )
        }
      </>
    );
  }

  return (
    <TodosList todos={todos} />
  );
};

const mapStateToProps = (state: State) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTodos: (todosWithUsers: Todos) => dispatch({
    type: SET_TODOS,
    value: todosWithUsers,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
