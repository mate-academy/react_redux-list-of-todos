import { connect } from 'react-redux';
import App from './App';
import { getTodos, sortTodos } from '../../store/store';

const mapDispatchToProps = dispatch => ({
  getTodos: () => dispatch(getTodos()),
  sortTodos: value => dispatch(sortTodos(value)),
});

const enhancedApp = connect(
  state => ({
    todos: state.todos,
    sortedTodos: state.sortedTodos,
    isLoading: state.isLoading,
    isSorted: state.isSorted,
    selectedSort: state.selectedSort,
    isLoaded: state.isLoaded,
  }),
  mapDispatchToProps,
)(App);

export {
  enhancedApp as App,
};
