import React, { useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';
import { getSelectedUserId, getTodosSelector } from './store/selectors';
import { addTodos } from './store/actions';

const App: React.FC = () => {
  const todos = useSelector(getTodosSelector);
  const selectedUserId = useSelector(getSelectedUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    getTodos()
      .then(data => dispatch(addTodos(data)));
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
        />
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

export default App;
