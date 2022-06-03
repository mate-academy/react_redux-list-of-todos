// import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getSelectUserIdSelector } from './store';

const App: React.FC = () => {
  // const [
  //   selectedUserId,
  //   setSelectedUserId,
  // ] = useState(0);
  const selectUsId = useSelector(getSelectUserIdSelector);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectUsId ? (
            <CurrentUser />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
