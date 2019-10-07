import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { deleteTodo } from '../../store';

const EnhancedTodoItem = connect(
  null,
  (dispatch, ownProps) => ({
    deleteTodo: () => dispatch(deleteTodo(ownProps.todo.id)),
  }),
)(TodoItem);

export {
  EnhancedTodoItem as TodoItem,
};
