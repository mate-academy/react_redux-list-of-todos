import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { AppDispatch, RootState } from './app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setTodoList } from './features/todos';
import { setCurrentTodo } from './features/currentTodo';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { status, query } = useSelector((state: RootState) => state.filter);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const todos = useSelector((state: RootState) => state.todos);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    getTodos()
      .then(data => {
        dispatch(setTodoList(data));
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const filteredTodoList = useMemo(() => {
    let filteredTodos = todos;

    if (status === 'active') {
      filteredTodos = todos.filter(todo => !todo.completed);
    } else if (status === 'completed') {
      filteredTodos = todos.filter(todo => todo.completed);
    }

    if (query) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filteredTodos;
  }, [status, query, todos]);

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
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList todoList={filteredTodoList} />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          todo={currentTodo}
          closeModal={() => dispatch(setCurrentTodo(null))}
        />
      )}
    </>
  );
};
