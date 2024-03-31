/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { ActiveTodos, CompletedTodos } from './features/filter';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  // const curTodo = useSelector((state: RootState) => state.currentTodo);
  const todos = useSelector((state: RootState) => state.todos.todos);
  const query = useSelector((state: RootState) => state.filter);
  const filterStatus = useSelector((state: RootState) => state.filter);
  const [isLoading, setIsLoading] = useState(true);
  // const isCurTodo = curTodo !== null;
  console.log(filterStatus)

  useEffect(() => {
    setIsLoading(true);
    getTodos().then(data => {
      dispatch(setTodos(data));
    });
    setIsLoading(false);
  });

  const filteredTodos = () => {
    let result = todos;

    switch (filterStatus) {
      case CompletedTodos:
        result = todos.filter(elem => elem.completed);
        break;
      case ActiveTodos:
        result = todos.filter(elem => !elem.completed);
        break;
      default:
        result = todos;
        break;
    }

    if (query !== null) {
      result = result.filter(elem => elem.title.includes(query));
    }

    return result;
  };

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
              {isLoading ? <Loader /> : <TodoList todos={filteredTodos()} />}
            </div>
          </div>
        </div>
      </div>

      {/* {isCurTodo ? <TodoModal curentTodo={curTodo} /> : <Loader />} */}
    </>
  );
};
