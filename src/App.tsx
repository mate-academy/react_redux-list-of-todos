import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { getTodos } from './api/api';
import './App.scss';
import {
  startLoading, loadingTodos, finishLoading, RootState,
} from './store/index';
import { TodoList } from './TodoList';
import Buttons from './Buttons';


const App = (props: RootState) => {
  const {
    todosList,
    isLoading,
    isVisible,
  } = props;

  const dispatch = useDispatch();

  const loadTodos = () => {
    dispatch(startLoading());
    getTodos()
      .then(data => dispatch(loadingTodos(data)))
      .finally(() => {
        dispatch(finishLoading());
      });
  };

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <div className="container">
        {!isVisible
          && (
            <button
              type="button"
              className="button"
              onClick={loadTodos}
            >
              Load Todos
            </button>
          )}
        {isLoading
          ? <div className="loader" />
          : (isVisible
          && (
            <>
              <Buttons />
              <TodoList todos={todosList} />
            </>
          )
          )}

      </div>
    </div>
  );
};


const mapStateToProps = (state: RootState) => ({
  todosList: state.todosList,
  isLoading: state.isLoading,
  isVisible: state.isVisible,
});


export default connect(mapStateToProps)(App);
