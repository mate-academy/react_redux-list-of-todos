import { connect } from 'react-redux';
import TodoList from './TodoList';

const enhancedTodoList = connect(
  state => ({
    todos: state.selectedSort === 'Do not sort'
      ? state.todos
      : state.sortedTodos,
  }),
)(TodoList);

export {
  enhancedTodoList as TodoList,
};
