import { connect } from 'react-redux';
import {
  setIsLoadind,
  setTodos,
} from '../../store/actionCreators';
import './App.css';
import { AppTemplate } from './AppTemplate';


const mapState = (state: RootState) => ({
  isLoading: state.isLoading,
  todos: state.todos,
});

const mapDispatch = {
  setIsLoadind,
  setTodos,
};

export const App = connect(
  mapState,
  mapDispatch,
)(AppTemplate);
