import './App.scss';
import './styles/general.scss';
import { useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { userSelectors } from './store/user';
import { SearchForm } from './components/SearchForm/SearchForm';

const App = () => {
  const selectedUserId = useSelector(userSelectors.getUserId);

  return (
    <div className="App">
      <div className="App__sidebar">
        <SearchForm />
        <TodoList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
