import { connect } from 'react-redux';
import TodoList from './TodoList';

const EnhancedTodoList = connect(
  ({ todos }) => ({ todos })
)(TodoList);

export {
  EnhancedTodoList as TodoList,
};
