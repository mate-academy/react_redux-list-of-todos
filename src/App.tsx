import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import React, { useEffect } from 'react';
import { useFetch } from './components/hooks/useFetch';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { todosSlice } from './features/todos';
import { useAppSelector } from './app/store';

export const App = () => {
  const {
    data: todos,
    isLoading,
    errorMessage,
  } = useFetch<Todo[]>(getTodos, []);
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (todos.length > 0) {
      dispatch(todosSlice.actions.setTodos(todos));
    }
  }, [dispatch, todos]);

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
              {isLoading && <Loader />}
              {!isLoading && todos.length > 0 && <TodoList />}
              {!isLoading && errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
