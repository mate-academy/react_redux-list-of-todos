import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import './App.css';
import { getData } from './components/getData/getData';
import TodoList from './components/TodoList/TodoList';
import { State, setIsLoad, setTodosWithUsers } from './store';

interface Props {
  todos: TodoWithUser[] | [];
  setTodos: (value: TodoWithUser[]) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const App: FC<Props> = (props) => {
  const {
    todos,
    setTodos,
    isLoading,
    setIsLoading,
  } = props;

  const handleStart = async () => {
    setIsLoading(true);
    const todosFromServer = await getData();

    setTodos(todosFromServer);
    setIsLoading(false);
  };

  const filterForAll = (filterType: string) => {
    switch (filterType) {
      case 'title':
        setTodos([...todos]
          .sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case 'name':
        setTodos([...todos]
          .sort((a, b) => a.user.name.localeCompare(b.user.name)));
        break;
      case 'completed':
        setTodos([...todos]
          .sort((a, b) => +a.completed - +b.completed));
        break;
      default:
    }
  };

  if (!todos.length) {
    return (
      <div className="app">
        <button
          className="button is-info"
          type="button"
          onClick={handleStart}
        >
          {(isLoading) ? 'Loading....' : 'Add'}
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="buttons-box">
        <button
          className="button is-info"
          type="button"
          onClick={() => filterForAll('title')}
        >
          Filter Title
        </button>
        <button
          className="button is-info"
          type="button"
          onClick={() => filterForAll('name')}
        >
          Filter Name
        </button>
        <button
          className="button is-info"
          type="button"
          onClick={() => filterForAll('completed')}
        >
          Filter Completed
        </button>
      </div>
      <TodoList todos={todos} />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  todos: state.todos,
  isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoad(isLoading)),
  setTodos: (todos: TodoWithUser[] | []) => dispatch(setTodosWithUsers(todos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
