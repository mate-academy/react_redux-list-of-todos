/* eslint-disable no-console */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadTodosSelector } from './store/selectors';
import './App.scss';
import { loadTodos } from './store/actions';

const App = () => {
  const todos = useSelector(loadTodosSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  console.log(todos);

  return (
    <div className="App">
      <ul className="TodoList">
        {todos.map(({ title, id }) => (
          <li key={id}>
            <p>{title}</p>
            <button type="button">Open</button>
            <button type="button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

/**
 * import Start from './components/Start';
import { Finish } from './components/Finish';
import { isLoading, getMessage, loadingTodos } from './store/selectors';

 *   const loading = useSelector(isLoading);
  const message = useSelector(getMessage) || 'Ready!';

 *     <div className="App">
      <h1>Redux list of todos</h1>
      <h2>{loading ? 'Loading...' : message}</h2>

      <Start title="Start loading" />
      <Finish title="Succeed loading" message="Loaded successfully!" />
      <Finish
        title="Fail loading"
        message="An error occurred when loading data."
      />
    </div>
 */
