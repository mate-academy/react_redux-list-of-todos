import React from 'react';
import { useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import './App.scss';
import { getUserSelector } from './store/selectors';
import { CurrentUser } from './components/CurrentUser';

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
