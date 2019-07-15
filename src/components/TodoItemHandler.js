import {connect} from 'react-redux';
import TodoItem from './TodoItem';
import { removeItemAction } from '../redux/action';

function mapStateToProps(state, ownProps) {
  return {
    title: ownProps.todo.title,
    user: ownProps.todo.user.name,
    email: ownProps.todo.user.email,
    status: ownProps.todo.completed,
    index: ownProps.index
  };
};

function mapStateToDispatch(dispatch) {
  return {
    removeTodo: (id) => dispatch(removeItemAction(id))
  };
};

const TodoItemHanlder = connect(mapStateToProps, mapStateToDispatch)(TodoItem);

export default TodoItemHanlder;
