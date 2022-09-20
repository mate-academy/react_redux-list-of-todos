import { useAppSelector } from './store/hooks';
import './App.scss';
import './styles/general.scss';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

export const App = () => {
  const selectedUser
  = useAppSelector(state => state.currentTodo.selectedUser);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>
      <div className="App__content">
        <div className="App__content-container">
          {selectedUser
            ? (
              <CurrentUser />
            )
            : <h3>No user selected</h3>}
        </div>
      </div>
    </div>
  );
};
