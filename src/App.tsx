import './App.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from './api/api';
import { getTodosSelector, getSelectedUserId } from './store/selectors';
import { ACTIONS } from './store/actions';
import { TodoList } from './Components/TodoList/TodoList';
import { CurrentUser } from './Components/CurrentUser/CurrentUser';

export const App:React.FC = () => {
  const todos = useSelector(getTodosSelector);
  const selectedUserId = useSelector(getSelectedUserId);
  const dispatch = useDispatch();
  const { addTodos } = ACTIONS;

  useEffect(() => {
    getTodos()
      .then(todosFS => dispatch(addTodos(todosFS)));
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        {todos.length ? (
          <TodoList />
        ) : 'Loading...'}
      </div>
      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};
