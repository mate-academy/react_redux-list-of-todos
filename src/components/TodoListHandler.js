import TodoList from "./TodoList";
import { connect } from 'react-redux';
import { load,sortData } from '../redux/actions';

function mapStateToProps(state) {
  return {
    articleRequested: state.requested,
    articleData: state.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    buttonClicked: () => dispatch(load()),
    sortData: (field) => dispatch(sortData(field))
  };
}

const TodoListHandler = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default TodoListHandler;
