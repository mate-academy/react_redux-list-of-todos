import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api';
import { filterByStatusAction, filterByTitleAction, State } from './store';
import { Todo } from './types/Todo';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: State) => state.todos);
  const filterByStatus = useSelector((state: State) => state.filterByStatus);
  const filterByTitle = useSelector((state: State) => state.filterByTitle);
  const selectedUserId = useSelector((state: State) => state.selectedUserId);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [filterByStatus]);

  const filterByStatusResult = (status: string) => {
    switch (status) {
      case 'completed':
        return true;
      case 'active':
        return false;
      default:
        return 'all';
    }
  };

  const callbackFilterTitle = (todo: Todo) => {
    const { title, completed } = todo;

    if (filterByStatusResult(filterByStatus) === 'all') {
      return (title.includes(filterByTitle));
    }

    return (title.includes(filterByTitle)
      && completed === filterByStatusResult(filterByStatus));
  };

  const changeFilterTitle = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterByTitleAction(event.target.value));
  };

  const changeFilterByStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterByStatusAction(event.target.value));
  };

  const visibleTodos = todos.filter(callbackFilterTitle);

  return (
    <div className="App">
      <div className="App__sidebar">
        <span>Filter title</span>
        <input type="text" value={filterByTitle} onChange={changeFilterTitle} />
        <select value={filterByStatus} onChange={changeFilterByStatus}>
          <option value="all">all</option>
          <option value="completed">completed</option>
          <option value="active">active</option>
        </select>
        <TodoList todos={visibleTodos} />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
