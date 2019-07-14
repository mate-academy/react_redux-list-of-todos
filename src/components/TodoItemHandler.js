import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { remove } from '../redux/actions';

function mapStateToProps(state, ownProps) {
  return {
    title: ownProps.todo.title,
    index: ownProps.index,
    user: ownProps.todo.userName,
    email: ownProps.todo.userEmail,
    status: ownProps.todo.status,
    todos: state.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    remove: (index, todos) => dispatch(remove(index, todos)),
  };
}

const TodoItemHandler = connect(mapStateToProps, mapDispatchToProps)(TodoItem);
export default TodoItemHandler;
