import React, { FC, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getTodos, getUsers } from './api/getData/getData';
import TodoList from './components/TodoList';
import { InitialState } from './redux/rootReducer';
import './App.css';
import { setTodos as setTodosData } from './actions/actionCreator';


interface Props {
  todos: PreparedTodo[];
  setTodos: (todos: PreparedTodo[]) => {};
}

const App: FC<Props> = ({ todos, setTodos }) => {
  const [isLoading, setIsLoading] = useState(false);
  const prepearedTodos = [...todos];

  const loadTodos = async () => {
    setIsLoading(true);
    const todosFromApi = await getTodos();
    const usersFromApi = await getUsers();

    setTodos(todosFromApi.map(todo => ({
      ...todo,
      user: usersFromApi.find(person => person.id === todo.userId) as User,
    })));
    setIsLoading(false);
  };

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="main">
      <div>
        {!todos.length
          ? (
            <button
              className="btn btn-primary"
              type="button"
              onClick={loadTodos}
            >
              Load All
            </button>
          )
          : (
            <TodoList
              todos={prepearedTodos}
            />
          )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTodos: (todos: PreparedTodo[]) => dispatch(setTodosData(todos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
