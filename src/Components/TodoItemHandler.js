import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import {
  removeItem,
} from '../redux/actions';

function mapStateToProps(state, ownProps) {
  return {
    todos: state.todos,
    item: ownProps.item,
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
