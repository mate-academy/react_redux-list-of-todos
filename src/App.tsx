import React from 'react';
import './App.scss';
import './styles/general.scss';
import { useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { RootState } from './store';

const App: React.FC = () => {
  const user
    = useSelector((state: RootState) => state.userReducer.user);
  const userError
    = useSelector((state: RootState) => state.userReducer.messageError);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {user || userError ? (
            <CurrentUser />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
