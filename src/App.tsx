import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTodos, getUsers } from './api/api';

import './App.scss';
import { RootState } from './store';
import { CurrentUser } from './components/CurrentUser';
import { TodoList } from './components/Todolist';

const App = () => {
  const selectedUser = useSelector((state: RootState) => state.selectedUser.selectedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTodos());
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>
      <div className="App__content">
        <div className="App__content-container">
          {selectedUser !== null ? (
            <CurrentUser />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
