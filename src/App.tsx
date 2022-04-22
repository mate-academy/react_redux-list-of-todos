import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bulma/css/bulma.min.css';

import { getSelectedUserIdSelector } from './store/selectors';
import { ACTIONS_CREATORS } from './store/actions/todos.actions';
import { UserDetails } from './components/UserDetails/UserDetails';
import { TodoList } from './components/TodoList/TodoList';
import './App.scss';

const App = () => {
  const selectedUserId = useSelector(getSelectedUserIdSelector);

  const dispatch = useDispatch();
  const { loadTodos } = ACTIONS_CREATORS;

  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <UserDetails />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
