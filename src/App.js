import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import './App.css';
import { loadTodos } from './store';

class App extends React.Component {
  loadUsersAndTodos = () => {
    this.props.loadTodos();
  }

  render() {
    const { todos, isLoading, isStart } = this.props;

    if (isLoading) {
      return <p className="load">Loading...</p>;
    }

    return (
      <div className="App">
        <h1>List of todos</h1>
        {isStart ? (
          <section />
        ) : (
          <section className="load">
            <button
              onClick={this.loadUsersAndTodos}
              type="button"
              className="ui basic button"
            >
              <i className="icon user" />
              Load Users
            </button>
          </section>
        )}
        <TodoList todos={todos} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
  isLoading: state.isLoading,
  isStart: state.isStart,
});

const mapDispatchProps = dispatch => ({
  loadTodos: () => dispatch(loadTodos),

});

App.propTypes = {
  todos: PropTypes.objectOf(PropTypes.any).isRequired,
  loadTodos: PropTypes.func.isRequired,
  isLoading: PropTypes.func.isRequired,
  isStart: PropTypes.func.isRequired,
};

export default connect(mapStateToProps,
  mapDispatchProps)(App);
