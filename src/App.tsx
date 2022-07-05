import { useSelector } from 'react-redux';
import React, { useEffect, useMemo, useState } from 'react';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { ControlPanel } from './components/ControlPanel/ControlPanel';
import { getTodos } from './api/api';
// eslint-disable-next-line import/no-named-as-default-member
import store, { actions, selectors } from './store';
import './App.scss';
import './styles/general.scss';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [randomSort, setRandomSort] = useState(false);

  const todos = useSelector(selectors.getTodos);
  const user = useSelector(selectors.getUser);

  useEffect(() => {
    getTodos()
      .then(res => store.dispatch(actions.setTodos(res)));
  },
  []);

  const filteredByTitle = useMemo(() => {
    return todos.filter(todo => todo.title.includes(query));
  }, [query, todos]);

  const filteredByOption = useMemo(() => {
    switch (sortBy) {
      case 'completed':
        return filteredByTitle.filter(todo => todo.completed);
      case 'active':
        return filteredByTitle.filter(todo => !todo.completed);
      default:
        return filteredByTitle;
    }
  }, [filteredByTitle, sortBy]);

  const filteredTodos = useMemo(() => {
    if (!randomSort) {
      return filteredByOption;
    }

    return filteredByOption.sort(() => 0.5 - Math.random());
  }, [randomSort, filteredByOption]);

  return (
    <div className="App">
      <div className="App__sidebar">
        <ControlPanel
          query={query}
          setQuery={setQuery}
          sortBy={sortBy}
          changeSortBy={setSortBy}
          randomSort={randomSort}
          changeRandomSort={setRandomSort}
        />
        {todos.length > 0
          ? (
            <TodoList
              todos={filteredTodos}
            />
          )
          : 'No todos yet'}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {user ? (
            <CurrentUser />
          ) : (
            <h3 className="App-info-text">
              No user selected
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
