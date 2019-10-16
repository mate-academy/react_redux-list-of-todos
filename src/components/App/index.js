import { connect } from 'react-redux';
import App from './App';
import {
  startLoading,
  handleSuccess,
  handleError,
  handleRemove,
  handleSort,
} from '../../store/actions';

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  hasError: state.hasError,
  todosWithUsers: state.todosWithUsers,
  disabled: state.disabled,
  sortedTodos: state.sortedTodos,
});

const AppWrap = connect(mapStateToProps,
  {
    startLoading,
    handleSuccess,
    handleError,
    handleRemove,
    handleSort,
  })(App);

export {
  AppWrap as App,// eslint-disable-line
};
