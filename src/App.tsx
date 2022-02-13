/* eslint-disable no-console */
import { useTypedSelector } from './hooks/useTypedSelector';
import 'bulma/css/bulma.min.css';

import './App.scss';
import { User } from './components/User';
import { TodoList } from './components/TodoList';

const App = () => {
  const { userId }: State = useTypedSelector(state => state);

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <TodoList />
      {userId !== 0 && <User />}
    </div>
  );
};

export default App;
