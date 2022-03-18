import React from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import { CurrentUser } from './components/CurrentUser/CurrentUser';
import { TodoList } from './components/TodoList/TodoList';
import { getUserSelector } from './store/selectors';
import './styles/general.scss';

const App: React.FC = () => {
  const user = useSelector(getUserSelector);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList user={user} />
      </div>
      <div className="App__content">
        <div className="App__content-container">
          {user
            ? <CurrentUser user={user} />
            : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
