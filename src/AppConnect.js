import { connect } from 'react-redux';
import App from './App';
import { getTodosUsers, sortTodos } from './store/index';

const mapDispatchToProps = dispatch => ({
  getTodosUsers: () => dispatch(getTodosUsers()),
  sortTodos: () => dispatch(sortTodos()),
});

const EnhancedApp = connect(
  state => ({
    isLoading: state.isLoading,
    isLoadData: state.isLoadData,
    hasError: state.hasError,
  }),
  mapDispatchToProps,
)(App);

export default EnhancedApp;
