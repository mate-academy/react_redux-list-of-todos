import React from 'react';
import { useSelector } from 'react-redux';

import './App.scss';
import { CurrentUser } from './components/CurrentUser/CurrentUser';
import { TodoList } from './components/TodoList/TodoList';
import { selectedUserIdSelector } from './store/selectors';

export const App: React.FC = React.memo(() => {
  const selectedId = useSelector(selectedUserIdSelector);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>
      <div className="App__content">
        <div className="App__content-container">
          {selectedId
            ? (
              <CurrentUser />
            ) : (
              <h3>
                No user selected
              </h3>
            )}
        </div>
      </div>
    </div>
  );
});
