import { connect } from 'react-redux';
import App from './App';
import { loadData, sortType, sortTodos } from '../../store';

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(loadData()),
  sortType: value => dispatch(sortType(value)),
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
