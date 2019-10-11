import { connect } from 'react-redux';
import TodoList from './TodoList';

const EnhancedList = connect(
  state => ({
    todos: state.todos,
    todosSorted: state.todosSorted,
    isSorted: state.isSorted,
  }),
)(TodoList);

export default EnhancedList;
