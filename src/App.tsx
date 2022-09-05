import { FC, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilterType } from './types/FilterType';
import { selectors } from './store';
import { fetchTodos } from './store/todos';

export const App: FC = () => {
  const dispatch = useDispatch();
  const { todos, loading, selectedTodo } = useSelector(selectors.getTodosInfo);
  const { filterType, appliedQuery } = useSelector(selectors.getFilter);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const filteredTodos = useMemo(() => {
    const lowerCasedQuery = appliedQuery.toLowerCase();

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
              <TodoFilter />
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
