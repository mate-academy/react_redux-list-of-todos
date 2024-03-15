/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch,
  // useAppSelector 
} from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  // const todos = useAppSelector(state => state.todos);
  const [ isLoading, setIsLoading ] = useState(false);
  
  useEffect(() => { 
    setIsLoading(true);
    getTodos()
      .then(result => {
        // console.log(result); 
        dispatch(todosActions.setTodos(result));
      })
      .finally(() => setIsLoading(false));
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
              {isLoading && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
