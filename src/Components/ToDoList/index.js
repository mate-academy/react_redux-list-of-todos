import { connect } from 'react-redux';
import ToDoList from './ToDoList';
import { sortByUser, sortByTitle, sortByStatus } from '../../store';

const mapDispatchToProps = dispatch => ({
  sortByUser: () => dispatch(sortByUser()),
  sortByTitle: () => dispatch(sortByTitle()),
  sortByStatus: () => dispatch(sortByStatus()),
});

const newToDoList = connect(
  ({ todos }) => ({ todos }),
  mapDispatchToProps
)(ToDoList);

export { newToDoList as ToDoList };
