import React from 'react';
import { useSelector } from 'react-redux';
import './styles/style.scss';
import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './CurrentUser';
import { selectedUserIdSelector } from './store/selectors';

const App: React.FC = () => {
  const selectedUserId = useSelector(selectedUserIdSelector);

  return (
    <div className="app">
      <div className="app__sidebar">
        <h1>Redux list of todos</h1>
        <TodoList />
      </div>

      <div className="app__content">
        <div className="app__content-container">
          {selectedUserId ? (
            <CurrentUser />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
