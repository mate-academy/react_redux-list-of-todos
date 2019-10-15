import { connect } from 'react-redux';
import TodoItemSort from './TodoItemSort';
import { sortType } from '../../store';

const mapDispatchToProps = {
  sortType,
};

const EnhancedTodoItemSort = connect(
  ({ sortMethod }) => ({ sortMethod }),
  mapDispatchToProps
)(TodoItemSort);

export {
  EnhancedTodoItemSort as TodoItemSort,
};
