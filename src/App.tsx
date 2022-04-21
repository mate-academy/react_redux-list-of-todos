import React from 'react';
import { useSelector } from 'react-redux';
import { CurrentUser } from './components/CurrentUser';
import { TodoList } from './components/TodoList';
import './App.scss';
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
