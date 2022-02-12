import React from 'react';
import './App.scss';
import { useSelector } from 'react-redux';
import { TodoList } from './components/TodosList';
import { CurrentUser } from './components/CurrentUser';
import { getUserSelector } from './store/selectors';

const App: React.FC = () => {
  const user = useSelector(getUserSelector);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {user ? (
            <CurrentUser />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
