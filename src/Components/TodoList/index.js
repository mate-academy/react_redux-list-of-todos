import { connect } from 'react-redux';
import TodoList from './TodoList';

const ImprovedTodoList = connect(
  ({ todos }) => ({ todos })
)(TodoList);

export {
  ImprovedTodoList as TodoList,
};
