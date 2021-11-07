import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, fetchUsers } from './api';

import './App.scss';
import { CurrentUser } from './components/CurrentUser';
import { TodoList } from './components/Todolist';
import { RootState } from './store';

const App = () => {
  const selectedUser = useSelector((state: RootState) => state.selectedUser.selectedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTodos());
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
