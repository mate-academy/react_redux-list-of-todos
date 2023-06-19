import React, { useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as TodosActions } from './features/todos/actions';
import { getFilteredTodos } from './utils/helpers/filterTodos';
import { selectTodos } from './features/todos';
import { selectCurrentTodo } from './features/currentTodo';
import { selectFilter } from './features/filter';

export const App: React.FC = () => {
  const { todos, isError, isLoaded } = useAppSelector(selectTodos);
  const selectedTodo = useAppSelector(selectCurrentTodo);
  const filter = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const fetchedTodos = await getTodos();

        dispatch(TodosActions.addTodos(fetchedTodos));
      } catch {
        dispatch(TodosActions.setIsError(true));
      } finally {
        dispatch(TodosActions.setIsLoaded(true));
      }
    };

    fetchTodo();
  }, []);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, filter);
  }, [todos, filter]);

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
              {isLoaded ? (
                <TodoList todos={filteredTodos} />
              ) : (
                <Loader />
              )}

              {isError && (
                <p className="notification is-warning">
                  Something went wrong, please try again later
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
