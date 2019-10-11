import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { deleteTodo } from '../../store/index';

const mapDispatchToProps = dispatch => ({
  deleteTodo: id => dispatch(deleteTodo(id)),
});

const EnhancedTodoItem = connect(
  state => ({
    isLoading: state.isLoading,
    isLoadData       : state.isLoadData       ,
    hasError: state.hasError,
  }),
  mapDispatchToProps,
)(TodoItem);

export default EnhancedTodoItem;
