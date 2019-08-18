import React from 'react';
import { connect } from 'react-redux';

import './Styles/App.css';
import TodoList from './TodoList';
import getFromServer from './Get';

import {
  getUnitedData,
  setTodos,
  getLoading,
  getIsLoading,
  getIsLoaded,
  sortByName,
  sortByValue,
  deleteTodo } from './store';

 class App extends React.Component {

  handleLoad = async() => {
    const {setTodos, getLoading} = this.props;
    getLoading()                                // store.dispatch(getLoading())  - аналогично работающий код
    const userWithTodo = await getFromServer();
    setTodos(userWithTodo)                      // store.dispatch({type: 'GET_TODOS', value: userWithTodo}) - аналогично работающий код
  };

  sortData = (event) => {
    const {value} = event.target;
    const {sortByName, sortByValue} = this.props;
    if (value === 'name') {
      sortByName();
    }
    else {
      sortByValue(value);
    }
    this.forceUpdate()
  };

  handleTodoDelete = (value) => {
    this.props.deleteTodo(value)
  };

  render() {
    const { isLoaded, isLoading } = this.props
    if (!isLoaded) {
      return (
        <button
          type="button"
          className="load-button"
          onClick={this.handleLoad}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      );
    }

    return (
      <div>
        <div className="App">
          <h1 className="app-title">Dynamic list of todos</h1>
          <select
            className="app-select"
            defaultValue="this.state.value"
            onChange={this.sortData}
          >
            <option value="" >Sort by: </option>
            <option value="name" >User </option>
            <option value="title" >Title </option>
            <option value="completed" >Status </option>
          </select>
        </div>
        <TodoList
          data={this.props.unitedData}
          handleTodoDelete={this.handleTodoDelete}
        />
      </div>
    );
  }
}

const getData = state => ({
  unitedData: getUnitedData(state),
  isLoaded: getIsLoaded(state),
  isLoading: getIsLoading(state),
});

const getMetods = dispatch => ({
  getLoading: () => dispatch(getLoading()),
  setTodos: (value) => dispatch(setTodos(value)),
  sortByName: () => dispatch(sortByName()),
  sortByValue: (value) => dispatch(sortByValue(value)),
  deleteTodo: (value) => dispatch(deleteTodo(value))
});

export default connect(getData, getMetods) (App);
