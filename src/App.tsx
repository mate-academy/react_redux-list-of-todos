import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { loadTodos, loadUsers } from './loadData';
import { TodosWithUsers, User, Todo } from './types';
import TodoList from './TodoList/TodoList';
import { InitialState } from './store';
import { loadTodo } from './actionCreators';
import './App.css';

interface Props {
  todos: TodosWithUsers | [];
  setTodos: (todoWithUser: TodosWithUsers) => void;
}

const App: FC<Props> = ({ todos, setTodos }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadTodos = () => {
    setIsLoading(true);

    Promise.all([
      loadTodos,
      loadUsers,
    ])
      .then(([todosFromApi, usersFromApi]) => {
        const todoWithUser = todosFromApi.map((todo: Todo) => {
          const user = usersFromApi.find(
            (person: User) => todo.userId === person.id,
          ) as User;

          return { ...todo, user };
        });

        setTodos(todoWithUser);
        setIsLoading(false);
      });
  };

  return (
    <>
      <h1>Redux list of todos</h1>
      {
        todos.length
          ? (
            <div className="app">
              <TodoList
                todos={todos}
              />
            </div>
          )
          : (
            <button
              className="button"
              type="button"
              onClick={handleLoadTodos}
              disabled={isLoading}
            >
              Load Todo
            </button>
          )
      }
      {isLoading && (
        <p className="loading-text">Loading...</p>
      )}
    </>
  );
};

const mapStateToProps = (state: InitialState) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTodos: (todoWithUser: TodosWithUsers) => dispatch(loadTodo(todoWithUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
