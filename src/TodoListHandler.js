import { connect } from 'react-redux';
import { handleSort, getTodos, getSortedAsc, getSortField } from './store';
import TodoList from './TodoList';

const mapStateToProps = state => ({
  todos: getTodos(state),
  sortAsc: getSortedAsc(state),
  sortField: getSortField(state),
});

export default connect(mapStateToProps, { handleSort })(TodoList);
