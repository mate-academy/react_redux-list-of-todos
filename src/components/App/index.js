import { connect } from 'react-redux';
import App from './App';
import { loadData, sortData, sortTodos } from '../../store';

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(loadData()),
  sortData: value => dispatch(sortData(value)),
  sortTodos: () => dispatch(sortTodos()),
});

const EnhancedApp = connect(
  state => ({
    todos: state.todos,
    preparedTodos: state.preparedTodos,
    users: state.users,
    isLoading: state.isLoading,
    sortMethod: state.sortMethod,
  }),
  mapDispatchToProps,
)(App);

export {
  EnhancedApp as App,
};
