/* eslint-disable max-len */
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { selectors } from './store';
import { actions as loadingActions } from './store/loading';

const debounce = (func: (arg: string) => void, delay: number) => {
  let timerId: number;

  return (...args: string[]) => {
    clearInterval(timerId);

    timerId = window.setTimeout(func, delay, ...args);
  };
};

export const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectors.getLoading);
  const selectedTodo = useSelector(selectors.getTodo);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [appliedInputValue, setAppliedInputValue] = useState('');

  useEffect(() => {
    dispatch(loadingActions.startLoading());
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .finally(() => dispatch(loadingActions.finishLoading()));
  }, []);

  const applyInputValue = useCallback(
    debounce(setAppliedInputValue, 400), [appliedInputValue],
  );

  const filterTodos = useCallback((todoList: Todo[], queryInput: string) => {
    if (!todoList.length) {
      return null;
    }

    return todoList.filter(todo => {
      const includedTitle = todo.title.toLowerCase()
        .includes(queryInput.toLowerCase());

      switch (filter) {
        case 'all':
          return includedTitle;
        case 'active':
          return !todo.completed && includedTitle;
        case 'completed':
          return todo.completed && includedTitle;
        default:
          return todo;
      }
    });
  }, [appliedInputValue, filter]);

  const filteredTodos = useMemo(() => (
    filterTodos(todos, appliedInputValue)
  ), [todos, appliedInputValue, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                inputValue={inputValue}
                onFilter={setFilter}
                onInputValue={setInputValue}
                onAppliedInputValue={applyInputValue}
              />
            </div>

            <div className="block">
              {loading && (<Loader />)}
              {filteredTodos && (
                <TodoList
                  todos={filteredTodos}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      { selectedTodo && (
        <TodoModal />
      )}
    </>
  );
};
