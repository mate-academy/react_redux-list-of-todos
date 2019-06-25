import TodoList from "./TodoList";
import {connect} from "react-redux";
import {load, mapData} from "../redux/actions";

function mapStateToProps(state) {
  return {
    todos: state.todoList,
    requested: state.requested
  };
}

function mapDispatchToProps(dispatch) {
  return {
    buttonLoadClicked: () => dispatch(load()),
    mapData: () => dispatch(mapData())
  };
}

const TodoListHandler = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default TodoListHandler;
