import { connect } from 'react-redux';
import TodoList from './TodoList';
import { sortTodos } from '../../store';

const mapDispatchToProps = dispatch => ({
  sortTodos: () => dispatch(sortTodos()),
});

const EnhancedTodoList = connect(
  state => ({
    todos: state.todos,
  }),
  mapDispatchToProps,
)(TodoList);

export {
  EnhancedTodoList as TodoList,
};
