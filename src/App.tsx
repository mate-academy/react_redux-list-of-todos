import { useSelector } from 'react-redux';
import './App.scss';
import { selectors } from './store';

export const App = () => {
  // `useSelector` connects our component to the Redux store
  // and rerenders it after every dispatched action
  const loading = useSelector(selectors.isLoading);

  // we do not call a selector with (), just pass a link to it
  const message = useSelector(selectors.getMessage) || 'Ready!';

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <h2>{loading ? 'Loading...' : message}</h2>
    </div>
  );
};
