import TodoList from "./TodoList";
import {connect} from "react-redux";
import {loadTodos, loadUsers} from "../redux/actions";
import {selectTodoMap, selectIsLoading, selectIsLoaded} from "../redux/selectors";

function mapStateToProps(state) {
  return {
    isLoading: selectIsLoading(state),
    isLoaded: selectIsLoaded(state),
    todoMap: selectTodoMap(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadTodos: () => dispatch(loadTodos()),
    loadUsers: () => dispatch(loadUsers())
  };
}

const TodoListHandler = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default TodoListHandler;
