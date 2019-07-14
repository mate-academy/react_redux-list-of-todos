import { connect } from 'react-redux';
import TodoList from './TodoList';
import { load, sorting } from '../redux/actions';

function mapStateToProps(state) {
  return {
    requested: state.requested,
    todos: state.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    buttonClick: () => {
      dispatch(load());
    },
    sorting: (field, todos) => {
      dispatch(sorting(field, todos));
    },
  };
}

const TodoListHandler = connect(mapStateToProps, mapDispatchToProps)(TodoList);
export default TodoListHandler;
