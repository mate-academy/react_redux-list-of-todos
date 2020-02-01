import { connect } from 'react-redux';
import App from './App';
import { handleSort, getData } from '../../store/store';

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  todosWithUsers: state.todosWithUsers,
  hasError: state.hasError,
  sortedTodos: state.sortedTodos,
});

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getData()),
  sortTodos: sort => dispatch(handleSort(sort)),
});

const ImprovedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export {
  ImprovedApp as App,
};
