import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getTodos, getUsers } from './api/getData/getData';
import TodoList from './components/TodoList';
import { InitialState } from './redux/rootReducer';
import './App.css';
import { setTodos as setTodosData, setIsLoading } from './actions/actionCreator';
import { getSortedTodos } from './utils/getSortedTodos';

interface Props {
  todos: PreparedTodo[];
  setTodos: (todos: PreparedTodo[]) => void;
  setLoading: (value: boolean) => void;
  isLoad: boolean;
}

const App: FC<Props> = ({
  todos,
  setTodos,
  setLoading,
  isLoad,
}) => {
  const loadTodos = async () => {
    setLoading(true);
    const todosFromApi = await getTodos();
    const usersFromApi = await getUsers();

    setTodos(todosFromApi.map(todo => ({
      ...todo,
      user: usersFromApi.find(person => person.id === todo.userId) as User,
    })));
    setLoading(false);
  };

  if (isLoad) {
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
              todos={[...todos]}
            />
          )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    todos: getSortedTodos(state),
    isLoad: state.isLoading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTodos: (todos: PreparedTodo[]) => dispatch(setTodosData(todos)),
  setLoading: (value: boolean) => dispatch(setIsLoading(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
