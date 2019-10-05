import { connect } from 'react-redux';
import TodoList from './TodoList';

const mapStateToProps = state => ({
  todos: state.sortedTodosList,
});

export default connect(mapStateToProps)(TodoList);
