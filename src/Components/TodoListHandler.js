import { connect } from 'react-redux';
import { load, sortTodos } from '../redux/actions';
import TodoList from './TodoList';

function mapStateToProps(state) {
  return {
    requested: state.requested,
    data: state.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    buttonClicked: () => dispatch(load()),
    sortTodos: (field) => dispatch(sortTodos(field))
  }
}

const TodoListHandler = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default TodoListHandler;
