import { connect } from 'react-redux';
import { TodoList } from './TodoList';
import { filterChanged, handleClick } from '../redux/actions';

function mapStateToProps(state) {
  return {
    requested: state.requested,
    loadedUsers: state.loadedUsers,
    loadedTodos: state.loadedTodos,
    todos: state.todos,
    filteredTodos: state.filteredTodos,
    users: state.users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick: () => dispatch(handleClick()),
    filterChanged: event => dispatch(filterChanged(event)),
  };
}

export const TodoListHandler = connect(mapStateToProps, mapDispatchToProps)(TodoList);
