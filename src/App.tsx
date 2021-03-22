import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTodos, isUserError, isUserSelected, isTodosError
} from './store';
import { TodoList } from './components/TodoList';
import { FilterTodos } from './components/FilterTodos';
import { UserInfo } from './components/UserInfo';
import './App.scss';
import { ErrorWarning } from './components/ErrorWarning';

const App: FC = () => {
  const dispatch = useDispatch();
  const isUserInfoActive = useSelector(isUserSelected);
  const userLoadError = useSelector(isUserError);
  const isTodosLoadError = useSelector(isTodosError);

  const fetchTodos = () => {
    dispatch(getTodos());
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <h1 className="text-center">Redux list of todos</h1>
      <div className="container-fluid">
        <div className="row" />
        <div className="row">
          <div className="col-8">
            <FilterTodos />
            {!isTodosLoadError
              ? <TodoList />
              : <ErrorWarning
                data={'todos'}
                solution={'try again later'}
              />
            }
          </div>
          <div className="col-4">
            {userLoadError
              ? 'Server not response'
              : isUserInfoActive
                ? <UserInfo />
                : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

