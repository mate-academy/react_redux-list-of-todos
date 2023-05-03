/* eslint-disable max-len */
import React, {
  useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

// import debounce from 'lodash.debounce';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { prepareTodos } from './utils/prepareTodos';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // const [appliedQuery, setAppliedQuery] = useState('');

  const fetchedTodos = async () => {
    try {
      const data = await getTodos();

      dispatch(todosActions.setTodos(data));
      setIsLoading(false);
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchedTodos();
  }, []);

  // const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  // const handleSetQuery = useCallback((event: string) => {
  //   setQuery(event);
  //   applyQuery(event);
  // }, []);

  // const handleClearQuery = useCallback(() => {
  //   setQuery('');
  //   setAppliedQuery('');
  // }, []);

  const visibleTodo = useMemo(() => (
    prepareTodos(todos, query, status)),
  [todos, query, status]);

  if (hasError) {
    return (<span>Sorry, no todos at this moment</span>);
  }

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
              {isLoading
                ? (
                  <Loader />
                )
                : (
                  <TodoList
                    todos={visibleTodo}
                  />
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
