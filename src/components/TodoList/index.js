import { connect } from 'react-redux';
import TodoList from './TodoList';
import { sortByTitle } from '../../store';

const EnhancedTodoList = connect(
  state => ({ todos: state.todos }),
  {
    sortByTitle,
  },
)(TodoList);

export {
  EnhancedTodoList as TodoList,
};
