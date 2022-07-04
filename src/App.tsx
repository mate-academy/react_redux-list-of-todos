import { useSelector, useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import './styles/general.scss';

import './App.scss';
import { getInitTodos, getSelectedId } from './store';
import { setValueFilter, setValueSelect, setRandomize } from './store/actions';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getInitTodos);
  const selectedId = useSelector(getSelectedId);

  return (
    <div className="App">
      <div className="App__sidebar">
        <h2>{`Todos: ${todos.length}`}</h2>
        <div className="sidebar">
          <input
            type="text"
            className="input"
            placeholder="Enter title"
            onChange={(e) => dispatch(setValueFilter(e.target.value))}
          />
          <select
            className="select"
            onChange={(e) => dispatch(setValueSelect(e.target.value))}
          >
            {['all', 'active', 'completed'].map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <button
            type="button"
            className="randomize"
            onClick={() => dispatch(setRandomize())}
          >
            Randomize
          </button>
        </div>
        <TodoList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedId ? <CurrentUser /> : 'No user selected'}
        </div>
      </div>
    </div>
  );
};
