import { useSelector } from 'react-redux';

import './App.scss';
import 'bulma';

import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getSelectedUserId } from './store';

const App = () => {
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

export default App;
