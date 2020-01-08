import { connect } from 'react-redux';
import { deleteTodo } from '../../store';
import TodoItem from './TodoItem';

const ImprovedTodoItem = connect(
  null,
  (dispatch, ownProps) => ({
    deleteTodo: () => dispatch(deleteTodo(ownProps.todo.id)),
  })
)(TodoItem);

export {
  ImprovedTodoItem as TodoItem,
};
