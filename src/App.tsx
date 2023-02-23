import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions } from './features/todos';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const App: React.FC = () => {
  const [error, setError] = useState<string>('');
  const openedTodo = useAppSelector(state => state.currentTodo);
  const todoList = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadData = async () => {
      try {
        const todos = await getTodos();
        const setTodos = () => dispatch(actions.setTodos(todos));

        setTodos();
      } catch {
        setError('We can not load todos.');
      }
    };

    loadData();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {error
              ? (
                <p className="notification is-warning">
                  Something went wrong!
                </p>
              )
              : (
                <>
                  <h1 className="title">Todos:</h1>

                  <div className="block">
                    <TodoFilter />
                  </div>

                  <div className="block">
                    {
                      todoList.length > 0
                        ? (
                          <TodoList />
                        )
                        : <Loader />
                    }
                  </div>
                </>
              )}
          </div>
        </div>
      </div>

      {openedTodo && (
        <TodoModal />
      )}
    </>
  );
};
