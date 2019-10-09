import { connect } from 'react-redux';
import loadTodosAndUsers from '../../store/fetchPostsAndUsers';
import TodoList from '../../components/TodoList/TodoList';

const mapStateToProps = state => ({
  preparedTodos: state.preparedTodos,
  isLoading: state.isLoading,
  hasError: state.hasError,
});

const mapDispatchToProps = dispatch => ({
  loadTodosAndUsers: () => dispatch(loadTodosAndUsers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
