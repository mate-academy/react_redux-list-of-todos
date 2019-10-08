import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { deleteTodo } from '../../store/store';

const mapDispatchToProps = dispatch => ({
  deleteTodo: id => dispatch(deleteTodo(id)),
});

const enhancedTodoItem = connect(null, mapDispatchToProps)(TodoItem);

export {
  enhancedTodoItem as TodoItem,
};
