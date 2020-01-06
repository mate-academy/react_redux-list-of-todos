import { connect } from 'react-redux';
import { loadTodos, getIsLoading, getIsLoaded, getHasError } from './store';
import App from './App';

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  hasError: getHasError(state),
  isLoaded: getIsLoaded(state),
});

export default connect(mapStateToProps, { loadTodos })(App);
