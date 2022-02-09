import { useSelector } from 'react-redux';
import './App.scss';
import './styles/general.scss';
import CurrentUser from './components/CurrentUser';
import TodosList from './components/TodosList';
import SearchAndFilter from './components/SearcAndFilter';

const App = () => {
  const selectedUserId = useSelector((state: RootState) => state.selectedUserId);
  const userError = useSelector((state: RootState) => state.userError);

  const getUserMessage = () => {
    if (userError !== '') {
      return (
        <div className="App__content-container">
          {userError}
        </div>
      );
    }

    return (
      <div className="App__content-container">
        {selectedUserId ? (
          <CurrentUser />
        ) : 'Please select a user'}
      </div>
    );
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <h1>Redux list of todos</h1>
        <SearchAndFilter />
        <TodosList />
      </div>
      <div className="App__content">
        {getUserMessage()}
      </div>
    </div>
  );
};

export default App;
