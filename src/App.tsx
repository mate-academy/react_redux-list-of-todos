import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { selectors } from './store';
import { actions as todoActions } from './store/currentTodo';
import { actions as loadingActions } from './store/loading';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTotos] = useState<Todo[]>([]);

  const selectedTodo = useSelector(selectors.todo);
  const isLoading = useSelector(selectors.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const loading = async () => {
      const loadingTodo = await getTodos();

      setTodosFromServer(loadingTodo);
      setVisibleTotos(loadingTodo);
      dispatch(loadingActions.startLoading());
    };

    loading();
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
              {!isLoading
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
      {selectedTodo && (
        <TodoModal
          todo={visibleTodos.find(todo => todo.id === selectedTodo.id)}
          onClose={() => dispatch(todoActions.unsetTodo())}
        />
      )}
    </>
  );
};
