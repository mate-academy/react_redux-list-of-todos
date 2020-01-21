import { connect } from 'react-redux';
import App from './App';
import { getData, sortData, completeData } from '../store/store';

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getData()),
  sortData: () => dispatch(sortData()),
  completeData: () => dispatch(completeData()),
});

const EnhancedApp = connect(
  state => ({ data: state.data, isLoading: state.isLoading }),
  mapDispatchToProps,
)(App);

export {
  EnhancedApp as App,
};
