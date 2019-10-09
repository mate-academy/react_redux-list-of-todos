import { connect } from 'react-redux';
import deleteTodoFromList from '../../store/deleteTodo';
import TodoItem from '../../components/TodoItem/TodoItem';

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteTodoFromList: () => dispatch(deleteTodoFromList(ownProps.todo.id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem);
