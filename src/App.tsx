/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { actions } from './features/todos';
import { Todo } from './types/Todo';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const setTodos = (todos: Todo []) => dispatch(actions.setTodos(todos));

  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos().then(result => {
      setIsLoaded(true);
      setTodos(result);
    }).catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
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
              {isLoaded
                ? (
                  <>
                    <TodoList />
                    {/* eslint-disable-next-line react/button-has-type */}
                    {/* <button */}
                    {/*   onClick={() => { */}
                    {/*     // eslint-disable-next-line no-console */}
                    {/*     console.log('clicked'); */}

                    {/*     // eslint-disable-next-line no-console */}
                    {/*     console.log(currentTodo); */}
                    {/*   }} */}
                    {/* > */}
                    {/*   Check current */}
                    {/* </button> */}
                  </>
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo?.title
        && <TodoModal />}
    </>
  );
};
