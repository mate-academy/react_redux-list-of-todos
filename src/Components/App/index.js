import { connect } from 'react-redux';
import App from './App';
import {
  sortByUser,
  sortByTitle,
  sortByStatus,
  loading,
  getData,
  dataLoading,
} from '../../store/index';

const mapDispatchToProps = dispatch => ({
  sortByUser: () => dispatch(sortByUser()),
  sortByTitle: () => dispatch(sortByTitle()),
  sortByStatus: () => dispatch(sortByStatus()),
  loading: () => dispatch(loading()),
  getData: () => dispatch(getData()),
  dataLoading: () => dispatch(dataLoading()),
});

const newApp = connect(
  state => ({
    todos: state.todos,
    isLoading: state.isLoading,
  }),
  mapDispatchToProps
)(App);

export { newApp as App };
