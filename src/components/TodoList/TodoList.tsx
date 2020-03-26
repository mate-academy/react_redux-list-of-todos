import { connect } from 'react-redux';
import { setSortType } from '../../store/actionCreators';
import { TodoListTemplate } from './TodoListTemplate';

const mapState = (state: RootState) => ({
  todos: state.todos,
  typeOfSort: state.typeOfSort,
});

const mapDispatch = {
  setSortType,
};

export const TodoList = connect(mapState, mapDispatch)(TodoListTemplate);
