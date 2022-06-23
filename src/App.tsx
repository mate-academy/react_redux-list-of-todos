import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TodosActionCreators } from './redux/reducers/todos/action-creators';
import { selectedUser } from './redux/reducers/todos/selectors';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

import './App.scss';
import './styles/general.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const selectedUserId = useSelector(selectedUser);

  useEffect(() => {
    getTodos()
      .then((data) => dispatch(TodosActionCreators.setTodos(data)));
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
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
