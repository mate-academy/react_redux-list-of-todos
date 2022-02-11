import './App.scss';
import './styles/general.scss';
import { useSelector } from 'react-redux';
import { CurrentUser } from './components/CurrentUser';
import { TodoList } from './components/TodoList';
import { getUserSelector } from './store/selectors';

const App = () => {
  const user = useSelector(getUserSelector);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {user
            ? <CurrentUser />
            : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
