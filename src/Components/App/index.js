import { connect } from 'react-redux';
import App from './App';
import { sortTodos, getTodos, resetTodos } from '../../store/index';

const mapDispatchToProps = dispatch => ({
  sortTodos: () => dispatch(sortTodos()),
  getTodos: () => dispatch(getTodos()),
  resetTodos: () => dispatch(resetTodos()),
});

const ImprovedApp = connect(
  state => ({ todos: state.todos, isLoading: state.isLoading }),
  mapDispatchToProps,
)(App);

export {
  ImprovedApp as App,
};
