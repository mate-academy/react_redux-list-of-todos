import React from 'react';
import './App.scss';
import './styles/general.scss';
import { useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getUserSelector, getTodosSelector } from './store/selectors';

export const App: React.FC = () => {
  const selectedUserId = useSelector(getUserSelector);
  const todos = useSelector(getTodosSelector);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {todos.find(todo => todo.userId === selectedUserId) ? (
            <CurrentUser />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};
