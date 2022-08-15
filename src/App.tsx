import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { SelectOptions } from './types/Select_otions';

import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { selectors } from './store';
import { loadingActions } from './store/loading';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const dispatch = useDispatch();
  const isLoaded = useSelector(selectors.getloadingStatus);
  const selectedTodo = useSelector(selectors.getTodo);

  useEffect(() => {
    const fetchTodo = () => {
      getTodos().then(todos => {
        setTodosFromServer(todos);
        setFilteredTodos(todos);
        dispatch(loadingActions.finishLoading());
      });
    };

    fetchTodo();
  }, []);

  const todoFilter = (query: string, option: string) => {
    const todos = todosFromServer.filter(todo => {
      switch (option) {
        case SelectOptions.ALL:
          return todo.title.includes(query);

        case SelectOptions.ACTIVE:
          return !todo.completed && todo.title.includes(query);

        case SelectOptions.COMPLETED:
          return todo.completed && todo.title.includes(query);

        default:
          return false;
      }
    });

    setFilteredTodos(todos);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todoFilter={todoFilter} />
            </div>

            <div className="block">
              {isLoaded
                ? <TodoList todos={filteredTodos} />
                : <Loader />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal />}
    </>
  );
};
