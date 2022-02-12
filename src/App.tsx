import React from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import { CurrentUser } from './components/CurrentUser/CurrentUser';
import { TodoList } from './components/TodoList/TodoList';
import { getUserIdSelector } from './store/selectors';
import './styles/general.scss';

const App: React.FC = () => {
  const userId = useSelector(getUserIdSelector);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList userId={userId} />
      </div>
      <div className="App__content">
        <div className="App__content-container">
          {userId
            ? <CurrentUser userId={userId} />
            : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
