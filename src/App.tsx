import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { todosActions } from './features/todos';
import { Status } from './types/Status';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

const getLowerString = (str: string) => {
  return str.toLowerCase();
};

export const App: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => dispatch(todosActions.set(todosFromServer)));
  }, []);

  const getFilteredTodos = () => {
    let newTodos = [...todos];

    if (status !== Status.All) {
      newTodos = newTodos.filter(todo => (
        status === Status.Active ? !todo.completed : todo.completed
      ));
    }

    if (query.trim()) {
      const lowerQuery = getLowerString(query).trim();

      newTodos = newTodos.filter(({ title }) => {
        const lowerTitle = getLowerString(title);

        return lowerTitle.includes(lowerQuery);
      });
    }

    return newTodos;
  };

  const visibleTodos = getFilteredTodos();

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
              {todos.length > 0 ? (
                <TodoList todos={visibleTodos} />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {!!currentTodo && (
        <TodoModal
          currentTodo={currentTodo}
        />
      )}
    </>
  );
};
