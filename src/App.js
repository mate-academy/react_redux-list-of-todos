import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import { loadTodos, deleteTodo } from './store';

class App extends React.Component {
  loadTodos = async() => {
    await this.props.loadTodos();
  }

  render() {
    const { todosWithUsers, isLoading, isStarted } = this.props;

    if (isLoading) {
      return <h2>Loading...</h2>;
    }

    return (
      <div className="App">
        <h1 className="title">React/Redux List of Todos</h1>

        <section>
          {isStarted ? (
            <>
              <button
                type="button"
                className="button"
                onClick={this.sortByTitle}
              >
              Sort Todos
              </button>

              <button
                type="button"
                className="button"
                onClick={this.sortByLength}
              >
              Sort Todos Length
              </button>
            </>
          ) : (
            <button
              type="button"
              className="button"
              onClick={this.loadTodos}
            >
              Load
            </button>
          )}

          {todosWithUsers.length > 0 && <TodoList todos={todosWithUsers} />}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todosWithUsers: state.todosWithUsers,
  isLoading: state.isLoading,
  isStarted: state.isStarted,
});

const mapDispatchToProps = dispatch => ({
  loadTodos: () => dispatch(loadTodos()),
  deleteTodo: id => dispatch(deleteTodo(id)),
  // sortTitle: title => dispatch(sortByTitle(title)),
  // sortLength: title => dispatch(sortByLength(title)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

App.propTypes = {
  isStarted: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  todosWithUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadTodos: PropTypes.func.isRequired,
};
