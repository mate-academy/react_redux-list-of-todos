import './App.scss';
import { CurrentUser } from './components/CurrentUser/CurrentUser';
import { TodoList } from './components/TodoList/TodoList';

const App = () => {
  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <div className="App__sidebar">
        <TodoList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          <CurrentUser />
        </div>
      </div>
    </div>
  );
};

export default App;
