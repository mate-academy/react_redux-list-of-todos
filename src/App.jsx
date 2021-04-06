
import React from 'react';
import './styles/general.scss';
import 'bulma';
import TodoList from './components/TodoList';
import CurrentUser from './components/CurrentUser';
import './App.scss';
import { getUserId } from './store/selectors';
import { useSelector } from 'react-redux';

function App() {
  const userId = useSelector(getUserId);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {
            userId
              ? <CurrentUser />
              : 'No user selected'
          }
        </div>
      </div>
    </div>
  );
}

export default App;
