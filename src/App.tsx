/* eslint-disable max-len */
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SortType } from './types/SortType';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [sortType, setSortType] = useState(SortType.ALL);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const getPreparedTodos = useMemo(() => (
    currentTodos: Todo[],
  ) => {
    let sortedTodos: Todo[] = [];

    switch (sortType) {
      case SortType.ALL:
        sortedTodos = [...currentTodos];
        break;

      case SortType.ACTIVE:
        sortedTodos = currentTodos.filter(todo => !todo.completed);
        break;

      case SortType.COMPLETED:
        sortedTodos = currentTodos.filter(todo => todo.completed);
        break;

      default:
        throw new Error('Wrong sort type');
    }

    const normalizedValue = inputValue.toLowerCase().trim();

    return sortedTodos.filter(todo => todo.title.toLowerCase().includes(normalizedValue));
  }, [inputValue, sortType]);

  const preparedTodos = useMemo(() => getPreparedTodos(todos), [todos, inputValue, sortType]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                value={inputValue}
                setValue={setInputValue}
                setSortType={setSortType}
              />
            </div>

            <div className="block">
              {(loading && !preparedTodos.length && <Loader />)
                || (
                  <TodoList
                    todos={preparedTodos}
                    setLoading={setLoading}
                    currentTodo={currentTodo}
                    setCurrentTodo={setCurrentTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {!!currentTodo && (
        <TodoModal
          loading={loading}
          setLoading={setLoading}
          todo={currentTodo}
          setTodo={setCurrentTodo}
        />
      )}
    </>
  );
};
