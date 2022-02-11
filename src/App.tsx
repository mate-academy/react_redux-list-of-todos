import React from 'react';
import './App.scss';
import './styles/general.scss';
import { useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getSelectedUserId } from './store/selectors';

const App: React.FC = () => {
  const userId = useSelector(getSelectedUserId);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {userId ? (
            <CurrentUser />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
