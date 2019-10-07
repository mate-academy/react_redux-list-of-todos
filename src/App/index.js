import { connect } from 'react-redux';
import App from './App';
import { loadTodos } from '../store';

const EnhancedApp = connect(
  state => ({
    isLoaded: state.isLoaded,
    isLoading: state.isLoading,
    hasError: state.hasError,
  }),
  {
    loadTodos,
  },
)(App);

export {
  EnhancedApp as App,
};
