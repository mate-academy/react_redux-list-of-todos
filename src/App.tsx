import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from './api/api';
import { TodoList } from './components/TodoList/TodoList';
import { loadTodosSelector } from './selectors';
import { setTodosActions } from './actions';
import { CurrentUser } from './components/CurrentUser.tsx/CurrentUser';
import './App.scss';

const App = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const todos = useSelector(loadTodosSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    getTodos()
      .then(todosFromServe => dispatch(setTodosActions(todosFromServe)))
      .then(() => setLoading(true))
      .catch(() => setLoadingError(true));
  }, []);

  const showedTodos = todos
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      {!loading && (
        <p>In process...</p>
      )}

      {(loadingError && loading) && (
        <p>Failed loading data</p>
      )}

      {(loading && !loadingError) && (
        <div className="app">
          <div className="app__list">
            <input
              className="search"
              placeholder="Search todo"
              onChange={event => setQuery(event.currentTarget.value)}
            />
            <TodoList todos={showedTodos} />
          </div>
          <CurrentUser />
        </div>
      )}
    </>
  );
};

export default App;
