import { connect } from 'react-redux';
import { loadTodos } from '../../store/actionCreators';
import './App.css';
import { AppTemplate } from './AppTemplate';


const mapState = (state: RootState) => ({
  isLoading: state.isLoading,
  todos: state.todos,
});

const mapDispatch = {
  loadTodos,
};

export const App = connect(
  mapState,
  mapDispatch,
)(AppTemplate);
