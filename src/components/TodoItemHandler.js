import {connect} from 'react-redux';
import TodoItem from './TodoItem';
import {removeClicked} from "../redux/actions";

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.item.id,
    title: ownProps.item.title,
    author: ownProps.item.author,
    email: ownProps.item.email,
    completed: ownProps.item.completed
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeItem: (id) => dispatch(removeClicked(id))
  }
}

const TodoItemHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem);

export default TodoItemHandler;