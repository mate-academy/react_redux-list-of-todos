import { connect } from 'react-redux';
import TodoList from './TodoList';
import { load, sorting } from '../redux/actions';

function mapStateToProps(state) {
  return {
    data: state.data,
    todosRequested: state.requested,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    buttonClicked: () => dispatch(load()),
    sorting: (data, field) => dispatch(sorting(data, field)),
  };
}

const TodoListHandler = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default TodoListHandler;
