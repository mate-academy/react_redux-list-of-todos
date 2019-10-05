import { connect } from 'react-redux';
import TodoList from './TodoItem';
import { todoItemDelete } from '../../store/store';

const mapDispatchToProps = dispatch => ({
  deleteItem: id => dispatch(todoItemDelete(id)),
});

export default connect(
  null,
  mapDispatchToProps,
)(TodoList);
