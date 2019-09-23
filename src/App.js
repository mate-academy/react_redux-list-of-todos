import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TodoList from './TodoList';
import { loadTodos } from './store';
import './App.css';

class App extends React.Component {
  loadTodos = () => {
    this.props.loadTodos();
  }

  render() {
    const { isLoading, todos, hasError } = this.props;

    if (isLoading) {
      return <p>Loadig...</p>;
    }

    if (hasError) {
      return (
        <>
          <p>Erro occurrer!!</p>
          <button type="button" onClick={this.loadTodos}>try Again</button>
        </>
      );
    }

    if (todos.length === 0) {
      return (
        <>
          <p>No todos yet</p>
          <button type="button" onClick={this.loadTodos}>Load</button>
        </>
      );
    }
    return (
      <>
        <TodoList todos={todos} key={todos.id} />
      </>
    );
  }
}
const mapStateToProps = state => ({
  todos: state.todos,
  isLoading: state.isLoading,
  hasError: state.hasError,
});

const mapDispatchToProps = dispatch => ({
  loadTodos: () => dispatch(loadTodos()),
});

App.propTypes = {
  loadTodos: PropTypes.shape().isRequired,
  todos: PropTypes.shape().isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.string.isRequired,

};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
