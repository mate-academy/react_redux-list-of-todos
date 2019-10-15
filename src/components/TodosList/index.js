import { connect } from 'react-redux';
import TodosList from './TodosList';
import { callAction, deleteTodos } from '../../store/actions';

const mapStateToProps = state => ({
  todos: state.todos,
  isLoad: state.isLoad,
  isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  callAction: () => dispatch(callAction()),
  deleteTodos: () => dispatch(deleteTodos(ownProps.id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodosList);
