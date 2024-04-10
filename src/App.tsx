/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { useAppSelector } from './app/hooks';
import { useDispatch } from 'react-redux';
import { loadTodo } from './features/todos';
import { TodoModal } from './components/TodoModal';
import { User } from './types/User';

export const App: React.FC = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [todoUser, setTodoUser] = useState<User>();
  const dispatch = useDispatch();

  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoader(true);
    getTodos().then(todo => {
      dispatch(loadTodo(todo));
      if (currentTodo) {
        getUser(currentTodo.userId).then(data => {
          setTodoUser(data);
          setIsLoader(false);
        });
      } else {
        setIsLoader(false);
      }
    });
  }, [currentTodo, dispatch]);

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
              {isLoader && <Loader />}
              {!isLoader && <TodoList todos={todos} />}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal todoUser={todoUser} />}
    </>
  );
};
