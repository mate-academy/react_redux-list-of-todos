import { connect } from 'react-redux';
import App from './App';
import { loadData } from '../../store';

const mapDispatch2Props = dispatch => ({
  loadData: () => dispatch(loadData()),
});

function mapState2Props(state) {
  return {
    todos: state.todos,
    isLoading: state.isLoading,
    isLoaded: state.isLoaded,
  };
};

const Enhanced = connect(
  mapState2Props,
  mapDispatch2Props,
)(App);

export {
  Enhanced as App,
};
