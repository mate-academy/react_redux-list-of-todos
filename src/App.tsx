/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useSelector, useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { RootState } from './app/store';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { todosActions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.todos.loading);
  // const todos = useSelector((state: RootState) => state.todos.data);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  const loadTodos = async (): Promise<Todo[]> => {
    const todosData = await getTodos();

    return todosData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedTodos = await loadTodos();

        dispatch(todosActions.setTodos(loadedTodos));
        // dispatch(todosActions.setEndLoading(false));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {loading ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>
                <div className="block">
                  <TodoFilter />
                </div>
                <div className="block">
                  <TodoList />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
