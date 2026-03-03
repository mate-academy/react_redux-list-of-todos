import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';

import { getTodos, getUser } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  loadFailure,
  loadStart,
  loadSuccess,
  selectTodosError,
  selectTodosLoading,
} from './features/todos';
import {
  clearSelection,
  clearUser,
  selectCurrentTodo,
  selectCurrentTodoError,
  selectIsModalOpen,
  setCurrentTodoError,
  setCurrentUser,
} from './features/currentTodo';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const loadingTodos = useAppSelector(selectTodosLoading);
  const todosError = useAppSelector(selectTodosError);
  const selectedTodo = useAppSelector(selectCurrentTodo);
  const modalOpen = useAppSelector(selectIsModalOpen);
  const modalError = useAppSelector(selectCurrentTodoError);

  useEffect(() => {
    dispatch(loadStart());

    getTodos()
      .then(todos => {
        dispatch(loadSuccess(todos));
      })
      .catch(error => {
        dispatch(
          loadFailure(
            error instanceof Error ? error.message : String(error ?? 'Unknown'),
          ),
        );
      });
  }, [dispatch]);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    let isCancelled = false;

    dispatch(clearUser());
    dispatch(setCurrentTodoError(null));

    getUser(selectedTodo.userId)
      .then(user => {
        if (isCancelled) {
          return;
        }

        dispatch(setCurrentUser(user));
      })
      .catch(error => {
        if (isCancelled) {
          return;
        }

        dispatch(
          setCurrentTodoError(
            error instanceof Error ? error.message : String(error ?? 'Unknown'),
          ),
        );
        dispatch(clearSelection());
      });

    return () => {
      isCancelled = true;
    };
  }, [dispatch, selectedTodo]);

  const hasError = todosError ?? modalError;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {hasError && <span>{hasError}</span>}

            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {!loadingTodos && <TodoList />}
              {loadingTodos && <Loader />}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && <TodoModal />}
    </>
  );
};
