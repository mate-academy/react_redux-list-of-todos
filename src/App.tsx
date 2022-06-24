// import { useSelector } from 'react-redux';
import './App.scss';
import { CurrentUser } from './components/CurrentUser';
import { TodoList } from './components/TodoList';
import './styles/general.scss';

const App: React.FC = () => {
  return (
    <div className="App">
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
