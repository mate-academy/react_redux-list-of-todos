import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { TodoModal } from './components/TodoModal';
import { ActionTypes } from './types/Actions';

export const App: React.FC = () => {
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const onPageLoad = async () => {
    try {
      const result = await getTodos();

      dispatch({ payload: result, type: ActionTypes.todosSet });
      setError('');
    } catch {
      setError('unable to get todos');
    }
  };

  useEffect(() => {
    onPageLoad();
  }, []);

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
              <TodoList error={error} />
            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal currentTodo={currentTodo} />}
    </>
  );
};
