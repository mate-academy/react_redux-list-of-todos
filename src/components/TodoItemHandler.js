import {connect} from 'react-redux';
import TodoItem from './TodoItem';
import {getDeleteAction} from '../redux/actions';

function mapDispatchToProps(dispatch) {
  return {
    removeItem: (id) => dispatch(getDeleteAction(id))
  }
}

const TodoItemHandler = connect(
  null,
  mapDispatchToProps
)(TodoItem);

export default TodoItemHandler;
