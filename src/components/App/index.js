import { connect } from 'react-redux';
import App from './App';
import {
  startLoading,
  handleSuccess,
  handleError,
  handleRemove,
  handleSort,
} from '../../store/reducer';

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  hasError: state.hasError,
  todosWithUsers: state.todosWithUsers,
  disabled: state.disabled,
  sortedTodos: state.sortedTodos,
});

const mapDispatchToProps = dispatch => ({
  startLoading: () => dispatch(startLoading()),
  handleSuccess: todosWithUsers => dispatch(handleSuccess(todosWithUsers)),
  handleError: () => dispatch(handleError()),
  handleRemove: id => dispatch(handleRemove(id)),
  handleSort: e => dispatch(handleSort(e)),
});

const AppWrap = connect(mapStateToProps, mapDispatchToProps)(App);

export {
  AppWrap as App,// eslint-disable-line
};
