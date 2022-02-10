import 'bulma';
import './App.scss';
import { SelectedUser } from './components/SelectedUser';
import { TodosList } from './components/TodosList.tsx';
import { TopFilterLine } from './components/TopFilterLine';

const App = () => {
  return (
    <div className="App">
      <div className="App__top-line">
        <TopFilterLine />
      </div>
      <div className="App__content">
        <TodosList />
        <SelectedUser />
      </div>
    </div>
  );
};

export default App;
