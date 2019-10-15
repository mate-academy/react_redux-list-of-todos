import { connect } from 'react-redux';
import { deleteTodos } from '../../store/actions';
import TodoItem from './TodoItem';

const mapStateToProps = state => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteTodos: () => dispatch(deleteTodos(ownProps.todo.id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem);
