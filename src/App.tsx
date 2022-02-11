import './App.scss';
import './styles/general.scss';
import { TodosList } from './components/TodosList/TodosList';
import { CurrentUser } from './components/CurrentUser/CurrentUser';

const App = () => {
  return (
    <div className="App">
      <div className="App__sidebar">
        <TodosList />
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
