import { connect } from 'react-redux';
import TodoList from './TodoList';
import {
  loadUser,
  loadTodos,
  removeItem,
} from '../redux/actions';

function mapStateToProps(state) {
  return {
    requestedUsers: state.requestedUsers,
    requested: state.requested,
    users: state.users,
    todos: state.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadUser: () => dispatch(loadUser()),
    loadTodos: () => dispatch(loadTodos()),
    removeItem: index => dispatch(removeItem(index)),
  };
}

const TodoListHandler = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default TodoListHandler;
