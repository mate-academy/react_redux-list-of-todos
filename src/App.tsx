import React, { useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { fetchTodos } from './api/api';
import { setUserId } from './store/actions';
import { useTypesSelector } from './store';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const selectedUserId = useTypesSelector(state => state.todo.userId);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const selectUser = (userId:number) => {
    dispatch(setUserId(userId));
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          selectUser={selectUser}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              selectUser={selectUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
