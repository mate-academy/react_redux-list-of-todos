import { connect } from 'react-redux';
import { loadData, sortData } from '../redux/actions';
import TodoList from './TodoList';

function mapStateToProps(state) {
  return {
    requested: state.requested,
    data: state.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadData: () => dispatch(loadData()),
    sortData: string => dispatch(sortData(string)),
  };
}

const TodoListHandler = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default TodoListHandler;
