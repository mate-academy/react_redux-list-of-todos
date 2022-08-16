import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { selectors } from './store';
import { actions as loadingAction } from './store/loading';

import { Todo } from './types/Todo';

import { getTodos } from './api';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTotos] = useState<Todo[]>([]);

  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.loading);
  const selectedTodo = useSelector(selectors.todo);

  useEffect(() => {
    dispatch(loadingAction.startLoading());

    const load = async () => {
      const loadingTodo = await getTodos();

      setTodosFromServer(loadingTodo);
      setVisibleTotos(loadingTodo);
    };

    load();
  }, []);

  const filtredTodos = (query: string, condition: string) => {
    const todos = todosFromServer.filter(todo => {
      switch (condition) {
        case 'active':
          return !todo.completed && todo.title.includes(query);

        case 'completed':
          return todo.completed && todo.title.includes(query);

        default:
          return todo.title.includes(query);
      }
    });

    setVisibleTotos(todos);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filteredTodos={filtredTodos} />
            </div>

            <div className="block">
              {isLoading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
