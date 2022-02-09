import { useSelector } from 'react-redux';
import './App.scss';
import './styles/general.scss';
import CurrentUser from './components/CurrentUser';
import TodosList from './components/TodosList';
import SearchAndFilter from './components/SearcAndFilter';

const App = () => {
  const selectedUserId = useSelector((state: RootState) => state.selectedUserId);

  return (
    <div className="App">
      <div className="App__sidebar">
        <h1>Redux list of todos</h1>
        <SearchAndFilter />
        <TodosList />
      </div>
      <div className="App__content">
        {selectedUserId !== 0 ? <CurrentUser /> : <div>Please select a user</div>}
      </div>
    </div>
  );
};

export default App;
