import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';

import { selectors } from './store';

import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

const stringIncludes = (full: string, part: string) => (
  full.toLowerCase().includes(part.toLowerCase())
);

export const App: React.FC = () => {
  const selectedTodo = useSelector(selectors.selectedTodo);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [
    filterByStatus,
    setFilterByStatus,
  ] = useState<FilterStatus>(FilterStatus.ALL);
  const [
    filterByContent,
    setFilterByContent,
  ] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .then(() => setInitialized(true));
  }, []);

  useEffect(() => {
    switch (filterByStatus) {
      case FilterStatus.COMPLETE:
        setVisibleTodos(
          todos
            .filter(todo => todo.completed)
            .filter(todo => stringIncludes(todo.title, filterByContent)),
        );
        break;
      case FilterStatus.ACTIVE:
        setVisibleTodos(
          todos
            .filter(todo => !todo.completed)
            .filter(todo => stringIncludes(todo.title, filterByContent)),
        );
        break;
      case FilterStatus.ALL:
      default:
        setVisibleTodos(
          todos
            .filter(todo => stringIncludes(todo.title, filterByContent)),
        );
    }
  }, [todos, filterByStatus, filterByContent]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterByStatus={filterByStatus}
                setFilterByStatus={setFilterByStatus}
                filterByContent={filterByContent}
                setFilterByContent={setFilterByContent}
              />
            </div>

            <div className="block">
              {!initialized ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal />
      )}
    </>
  );
};
