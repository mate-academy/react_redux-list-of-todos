/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { TodoList } from './components/TodoList';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as TodosAction } from './features/todos';
import { RootState } from './app/store';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  const selectedTodo = useAppSelector((state) => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => {
        dispatch(TodosAction.setTodos(todosFromServer));
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteringTodos = (state: RootState) => {
    const { todos } = state;
    const { status, query } = state.filter;

    return todos.filter(todo => {
      const { title, completed } = todo;
      const checkInput = title
        .toLowerCase()
        .includes(query.toLowerCase());

      switch (status) {
        case 'all':
          return checkInput;
        case 'active':
          return checkInput && !completed;
        case 'completed':
          return checkInput && completed;
        default:
          return true;
      }
    });
  };

  const filteredTodos = useAppSelector(filteringTodos);

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
              {isLoading
                ? (<Loader />)
                : (<TodoList todos={filteredTodos} />)}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal />
      )}
    </>
  );
};
