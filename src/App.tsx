import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { loadTodos, loadUsers } from './loadData';
import { TodosWithUsers, User, Todo } from './types';
import TodoList from './TodoList/TodoList';
import { InitialState } from './store';
import { loadAllTodos, setLoading } from './actionCreators';
import './App.css';

interface Props {
  todos: TodosWithUsers | [];
  isLoading: boolean | undefined;
  setTodos: (todoWithUser: TodosWithUsers) => void;
  setIsLoad: (value: boolean) => void;
}

const App: FC<Props> = ({
  todos, setTodos, isLoading, setIsLoad,
}) => {
  const handleLoadTodos = () => {
    setIsLoad(true);

    Promise.all([
      loadTodos(),
      loadUsers(),
    ])
      .then(([todosFromApi, usersFromApi]) => {
        const todoWithUser = todosFromApi.map((todo: Todo) => {
          const user = usersFromApi.find(
            (person: User) => todo.userId === person.id,
          ) as User;

          return { ...todo, user };
        });

        setTodos(todoWithUser);
        setIsLoad(false);
      });
  };

  return (
    <>
      <h1>Redux list of todos</h1>
      {
        todos.length
          ? (
            <div className="app">
              <TodoList />
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
  isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTodos: (todoWithUser: TodosWithUsers) => dispatch(loadAllTodos(todoWithUser)),
  setIsLoad: (value: boolean) => dispatch(setLoading(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
