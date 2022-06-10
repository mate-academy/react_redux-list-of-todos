import { useSelector } from 'react-redux';
import './App.scss';
import './styles/general.scss';
import Start from './components/Start';
import { TodoList } from './components/TodoList';
import { SearchPanel } from './components/SearchPanel';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getStateUser } from './store';

const App = () => {
  const todos = useSelector(getTodos);
  const user = useSelector(getStateUser);

  return (
    <div className="App">
      <div className="App__sidebar">
        <h1 className="App__sidebar-title">TODOS</h1>

        {todos.length === 0
          ? (<Start title="Start" />)
          : (
            <>
              <SearchPanel />
              <TodoList />
            </>
          )}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {user.id !== 0 ? (
            <CurrentUser />
          ) : (
            <div className="App__content-container__message">
              <p>USER NO SELECTED</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
