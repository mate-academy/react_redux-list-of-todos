/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import './App.scss';
import { useAppSelector } from './store';

import '@fortawesome/@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { actions as todosActions } from './store/todos';
import { actions as loadingActions } from './store/loading';

export const App: React.FC = () => {
  const dispatch = useDispatch();

  const { loading, selectedTodo } = useAppSelector(state => state);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    dispatch(loadingActions.startLoading());

    getTodos()
      .then(todosFromServer => dispatch(todosActions.set(todosFromServer)))
      .finally(() => dispatch(loadingActions.finishLoading()));
  }, []);

  return (
    <div className="App">
      <>
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter />
              </div>

              <div className="block">
                {loading
                  ? <Loader />
                  : (
                    <TodoList
                      userId={user => setUserId(user)}
                    />
                  )}
              </div>
            </div>
          </div>
        </div>

        {selectedTodo && (
          <TodoModal
            userId={userId}
          />
        )}
      </>
    </div>
  );
};
