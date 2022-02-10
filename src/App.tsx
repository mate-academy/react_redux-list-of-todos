import { useSelector } from 'react-redux';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { getSelectedUserId } from './store/selectors';
import { CurrentUser } from './components/CurrentUser';

export const App: React.FC = () => {
  const selectedUserId = useSelector(getSelectedUserId);

  return (
    <div className="App">
      <div className="App__sidebar">
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
