import { connect } from 'react-redux';
import TodoItemSort from './TodoItemSort';
import { sortData } from '../../store';

const EnhancedTodoItemSort = connect(
  ({ sortMethod }) => ({ sortMethod }),
  { sortData }
)(TodoItemSort);

export {
  EnhancedTodoItemSort as TodoItemSort,
};
