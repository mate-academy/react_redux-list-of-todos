import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { remove } from '../redux/actions';

function mapStateToProps(state, ownProps) {
  return {
    todos: state.data,
    title: ownProps.data.title,
    completed: ownProps.data.completed,
    user: ownProps.data.user,
    index: ownProps.data.id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    remove: (data, index) => dispatch(remove(data, index)),
  };
}

const TodoItemHandler = connect(mapStateToProps, mapDispatchToProps)(TodoItem);

export default TodoItemHandler;
