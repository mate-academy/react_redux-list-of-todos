import './App.scss';
import './styles/general.scss';
import TodosList from './components/TodosList';

const App = () => {
  return (
    <div className="App">
      <div className="App__sidebar">
        <h1>Redux list of todos</h1>
        <TodosList />
      </div>
      <div className="App__content">
        User will be here
      </div>
    </div>
  );
};

export default App;
