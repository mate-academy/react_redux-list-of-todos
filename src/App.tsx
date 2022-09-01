/* eslint-disable max-len */
import {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilterType } from './types/FilterType';
import { debounce } from './decorator';
import { selectors } from './store';
import { fetchTodos } from './store/todos';

export const App: FC = () => {
  const [filterType, setFilterType] = useState(FilterType.All);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const dispatch = useDispatch();
  const { todos, loading, selectedTodo } = useSelector(selectors.getTodosInfo);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const applyQuery = useCallback(debounce(setAppliedQuery, 500), []);
  const filteredTodos = useMemo(() => {
    const lowerCasedQuery = query.toLowerCase();

    return todos.filter(todo => {
      const checkQuery = todo.title.toLowerCase().includes(lowerCasedQuery);

      switch (filterType) {
        case FilterType.All:
          return checkQuery;
        case FilterType.Active:
          return checkQuery && !todo.completed;
        case FilterType.Completed:
          return checkQuery && todo.completed;
        default:
          return true;
      }
    });
  }, [todos, appliedQuery, filterType]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterType={filterType}
                onFilterChange={setFilterType}
                searchQuery={query}
                onChange={setQuery}
                onAppliedChange={applyQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList todos={filteredTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} />
      )}
    </>
  );
};
