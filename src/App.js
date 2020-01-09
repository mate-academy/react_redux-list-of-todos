import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadTodos } from './redux/store';

import TodoList from './components/TodoList';

const App = ({ todoList, isLoading, loadTodos }) => (
  isLoading
    ? (
      <section>
        <h1>Dynamic list of todos</h1>
        <div className="App container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Status</th>
                <th scope="col">User Name</th>
                <th scope="col">User Email</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              <TodoList todos={todoList} />
            </tbody>
          </table>
        </div>
      </section>
    ) : (
      <>
        <button
          type="button"
          className="btn btn-info"
          onClick={async() => {
            await loadTodos();
          }}
        >
          LOAD
        </button>
      </>
    )
);

const mapStateToProps = state => ({
  todoList: state.todoList,
  isLoading: state.isLoading,
  hasError: state.hasError,
});

App.propTypes = {
  loadTodos: PropTypes.func.isRequired,
  todoList: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.object,
  })).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  { loadTodos }
)(App);
