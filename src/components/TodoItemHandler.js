import {connect} from 'react-redux';
import TodoItem from './TodoItem';
import { removeItemAction } from '../redux/action';

function mapStateToProps(state, ownProps) {
  return {
    todo: ownProps.selectedTodo
  };
};

function mapStateToDispatch(dispatch) {
  return {
    removeTodo: (id) => dispatch(removeItemAction(id))
  };
};

const TodoItemHanlder = connect(mapStateToProps, mapStateToDispatch)(TodoItem);

export default TodoItemHanlder;
