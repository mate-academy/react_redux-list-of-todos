import { CurrentUser } from './components/CurrentUser';
import { TodosList } from './components/TodoList';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <div className="App__sidebar box">
        <TodosList />
      </div>
      <div className="App__content box">
        <div className="App__content-container">
          <CurrentUser />
        </div>
      </div>
    </div>
  );
};

export default App;
