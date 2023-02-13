import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const loadTodos = async () => {
    setLoading(true);

    try {
      const loadedTodos = await getTodos();

      dispatch(todosActions(loadedTodos));
      setLoading(false);
    } catch (error) {
      throw new Error('Something was wrong with your internet connection');
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {loading && <Loader />}
            {todos.length > 0 && (
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
