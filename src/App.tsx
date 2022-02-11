// import React from 'react';
// import { useSelector } from 'react-redux';
import './App.scss';
import 'bulma/css/bulma.min.css';

import { useSelector } from 'react-redux';
import { getUserId } from './store/selectors';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App = () => {
  const userId = useSelector(getUserId);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {userId
            ? <CurrentUser />
            : <p>No user selected</p>}
        </div>
      </div>
    </div>
  );
};

export default App;
