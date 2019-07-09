import {connect} from 'react-redux';
import {loadData, sort} from '../redux/actions';
import TodoList from './TodoList';

function mapStateToProps(state) {
  return {
    items: state.items,
    requested: state.requested
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch(loadData()),
    sort: (headerTitle) => dispatch(sort(headerTitle))
  }
}

const TodoListHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default TodoListHandler;
