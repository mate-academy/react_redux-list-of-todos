import { connect } from 'react-redux';
import TodoItemSort from './TodoItemSort';
import { sortData } from '../../store';

const mapDispatchToProps = {
  sortData: sortData,
};

const EnhancedTodoItemSort = connect(
  ({ sortMethod }) => ({ sortMethod }),
  mapDispatchToProps
)(TodoItemSort);

export {
  EnhancedTodoItemSort as TodoItemSort,
};
