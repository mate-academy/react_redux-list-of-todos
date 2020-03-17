import React, { FC, useMemo } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { loadTodos, loadUsers } from './loadData';
import { TodosWithUsers, User, Todo } from './types';
import TodoList from './TodoList/TodoList';
import { InitialState } from './store';
import { loadAllTodos, setIsLoading } from './actionCreators';
import './App.css';

interface Props {
  todos: TodosWithUsers | [];
  isLoading?: boolean;
  sortField?: string;
  setTodos: (todoWithUser: TodosWithUsers) => void;
  setIsLoad: (value: boolean) => void;
}

const App: FC<Props> = ({
  todos, setTodos, sortField, isLoading, setIsLoad,
}) => {
  const handleLoadTodos = () => {
    setIsLoad(true);

    Promise.all([
      loadTodos(),
      loadUsers(),
    ]).then(([todosFromApi, usersFromApi]) => {
      const todosWithUser = todosFromApi.map((todo: Todo) => {
        const user = usersFromApi.find(
          (person: User) => todo.userId === person.id,
        ) as User;

        return { ...todo, user };
      });

      setTodos(todosWithUser);
      setIsLoad(false);
    });
  };

  const sort = (completeTodos: TodosWithUsers, sortBy: string) => {
    switch (sortBy) {
      case 'name':
        return [...completeTodos].sort(
          (a, b) => a.user.name.localeCompare(b.user.name),
        );

      case 'title':
        return [...completeTodos].sort(
          (a, b) => a.title.localeCompare(b.title),
        );

      case 'completed':
        return [...completeTodos].sort(
          (a, b) => Number(a.completed) - Number(b.completed),
        );

      default: return completeTodos;
    }
  };

  const sortedTodos = useMemo(() => sort(todos, sortField as string), [todos, sortField]);

  return (
    <>
      <h1>Redux list of todos</h1>
      {
        todos.length
          ? (
            <div className="app">
              <TodoList
                todos={sortedTodos}
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
  isLoading: state.isLoading,
  sortField: state.sortField,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTodos: (todoWithUser: TodosWithUsers) => dispatch(loadAllTodos(todoWithUser)),
  setIsLoad: (value: boolean) => dispatch(setIsLoading(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
