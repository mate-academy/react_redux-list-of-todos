import { connect } from 'react-redux';
import { removeItem } from '../redux/actions';
import TodoItem from './TodoItem';

function mapStateToProps(state, ownProps) {
  return {
    title: ownProps.todo.title,
    user: ownProps.todo.userName,
    email: ownProps.todo.userEmail,
    status: ownProps.todo.status,
    index: ownProps.index,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeItem: index => dispatch(removeItem(index)),
  };
}

const TodoItemHandler = connect(mapStateToProps, mapDispatchToProps)(TodoItem);
export default TodoItemHandler;
