/* eslint-disable max-len */
import {
  FC, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useDispatch, useSelector } from 'react-redux';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { ComplitedFilter } from './types/ComplitedFilter';
import './App.scss';
import { Loader } from './components/Loader';
import {
  LOADING_SELECTORS, TODO_SELECTORS, RootState, TODOS_SELECTORS, TODOS_ACTIONS_CREATOR,
} from './store';

export const App: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [complitedFilter, setComplitedFilter] = useState<ComplitedFilter>(ComplitedFilter.All);

  const dispatch = useDispatch();
  const loading = useSelector(LOADING_SELECTORS.loading);
  const currentTodoId = useSelector(TODO_SELECTORS.currentTodoId);
  const todos = useSelector(TODOS_SELECTORS.todos);

  useEffect(() => {
    dispatch(TODOS_ACTIONS_CREATOR.loadTodos());
  }, [dispatch]);

  const selectedTodo = useSelector((state: RootState) => {
    const newSelectedTodo = state.todos.find(todo => todo.id === currentTodoId) || null;

    return newSelectedTodo;
  });

  const filteredTodosBySearchQuery = useMemo(() => (
    todos.filter(todo => {
      const prepTitle = todo.title.toLowerCase();
      const prepSearchQuery = searchQuery.toLowerCase();

      return prepTitle.includes(prepSearchQuery);
    })), [searchQuery, todos]);

  const filteredTodos = useMemo(() => {
    return filteredTodosBySearchQuery.filter(todo => {
      switch (complitedFilter) {
        case ComplitedFilter.All:
          return true;
        case ComplitedFilter.Active:
          return !todo.completed;
        case ComplitedFilter.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [complitedFilter, filteredTodosBySearchQuery]);

  const errorNoTodosFromServer = !loading && todos.length === 0 && !searchQuery;
  const errorNoSuchTodosBySearchQuery = !loading && filteredTodos.length === 0 && searchQuery;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                complitedFilter={complitedFilter}
                setComplitedFilter={setComplitedFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {loading
                ? <Loader />
                : (
                  <TodoList
                    filteredTodos={filteredTodos}
                  />
                )}

              {errorNoTodosFromServer && (
                <h1>No results found</h1>
              )}

              {errorNoSuchTodosBySearchQuery && (
                <h1>{`No results found for "${searchQuery}" and filtered by "${complitedFilter}"`}</h1>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodoId && selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
        />
      )}

    </>
  );
};
