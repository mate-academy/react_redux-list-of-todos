/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        setLoading(true);
        const res = await getTodos();

        dispatch(actions.setTodos(res));
      } catch (error) {
        throw new Error('Error');
      } finally {
        setLoading(false);
      }
    };

    getAllTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            { loading ? <Loader /> : (
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
      { currentTodo && (
        <TodoModal />
      )}
    </>
  );
};
