import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppSelector } from './app/hooks';
import React, { useEffect } from 'react';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { todosActions } from './features/todos';
import { currentTodoActions } from './features/currentTodo';

export const App = () => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todosState = useAppSelector(state => state.todos);

  const handleModalClose = () =>
    dispatch(currentTodoActions.removeCurrentTodo());

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getTodos();

        dispatch(todosActions.setTodos(response));
      } catch {
        dispatch(todosActions.setError());
      }
    };

    fetchTodos();
  }, [dispatch]);

  let content: React.ReactNode = null;

  if (todosState.isLoading) {
    content = <Loader />;
  } else if (todosState.hasError) {
    content = <p>Something went wrong</p>;
  } else {
    content = (
      <>
        <h1 className="title">Todos:</h1>

        <div className="block">
          <TodoFilter />
        </div>

        <div className="block">
          <TodoList />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">{content}</div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal currentTodo={currentTodo} onClose={handleModalClose} />
      )}
    </>
  );
};
