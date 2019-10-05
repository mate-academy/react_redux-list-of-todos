import { connect } from 'react-redux';
import App from './App';
import {
  handleSort,
  loadData,
} from '../../store/store';

const mapStateToProps = state => ({
  todosList: state.todosList,
  sortedTodosList: state.sortedTodosList,
  isError: state.isError,
  isLoaded: state.isLoaded,
  isLoading: state.isLoading,
  buttonText: state.buttonText,
});

const mapDispatchToProps = dispatch => ({
  sortTodos: typeOfSort => dispatch(handleSort(typeOfSort)),
  loadDataFromServer: () => dispatch(loadData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
