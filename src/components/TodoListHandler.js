import {connect} from "react-redux";
import TodoList from './TodoList';
import {loadAction, sortOfTableAction, clearAllAction} from '../redux/action';

function mapStateToProps(state) {
  return {
    request: state.requested,
    listTodos: state.data
  };
};

function mapDispatchToProps(dispatch) {
  return {
    loadTodos: () =>  dispatch(loadAction()),
    sort: (value) => dispatch(sortOfTableAction(value)),
    clearAll: () => dispatch(clearAllAction())
  };
};

const TodoListHandler = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default TodoListHandler
