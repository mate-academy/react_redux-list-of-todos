import { connect } from 'react-redux';
import TodoList from './TodoList';

const enhancedTodoList = connect(
  state => ({
    todos: state.todos,
  }),
)(TodoList);

export {
  enhancedTodoList as TodoList,
};
