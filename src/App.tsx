import { useDispatch } from 'react-redux';

import './App.scss';
import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import lodash, { shuffle } from 'lodash';
import { loadTodo, useAppSelector } from './store';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './react-app-env';

export const App: FC = () => {
  const loading = useAppSelector(state => state.loader);
  const selectedTodo = useAppSelector(state => state.selectTodo.todo);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');
  const [filtredTodo, setFiltredTodo] = useState<Todo[]>([]);
  const [targetValue, setTargetValue] = useState('all');
  const [appliedQuery, setAppliedQuery] = useState('');

  const applyQuery = useCallback(
    lodash.debounce(setAppliedQuery, 1000), [],
  );

  const handleQuery = (input: string) => {
    setQuery(input);
  };

  const handleTarget = (target: string) => {
    setTargetValue(target);
  };

  const filterForTodos = (target: string) => {
    switch (target) {
      case 'active':
        setFiltredTodo(todos.filter(todo => !todo.completed));
        break;

      case 'completed':
        setFiltredTodo(todos.filter(todo => todo.completed));
        break;

      default:
        setFiltredTodo(todos);
        break;
    }

    setFiltredTodo(prevState => {
      return prevState.filter(todo => todo.title.includes(appliedQuery));
    });
  };

  useEffect(() => {
    dispatch(loadTodo());
  }, []);

  useEffect(() => {
    filterForTodos(targetValue);
  }, [todos, appliedQuery, targetValue]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <div className="is-flex is-justify-content-space-between">
              <h1 className="title">Todos:</h1>
              <button
                className="button is-black"
                type="button"
                onClick={() => {
                  setFiltredTodo(prevState => shuffle(prevState));
                }}
              >
                Shake
              </button>
            </div>

            <div className="block">
              <TodoFilter
                handleQuery={handleQuery}
                query={query}
                handleTarget={handleTarget}
                applyQuery={applyQuery}

              />
            </div>

            <div className="block">
              { loading
                ? (
                  <Loader />

                )
                : (
                  <TodoList
                    todos={filtredTodo}
                  />
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

export default App;
