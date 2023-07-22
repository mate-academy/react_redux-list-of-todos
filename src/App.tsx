/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as actionsTodos } from './features/todos';
import { SortType } from './types/SortType';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodoState = useAppSelector((state) => state.currentTodo);
  const todosState = useAppSelector((state) => state.todos);
  const filterState = useAppSelector((state) => state.filter);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await getTodos();

        dispatch(actionsTodos.setTodo(loadedTodos));
        setIsLoading(false);
      } catch (error) {
        if (error) {
          throw new Error('Todos can not be loaded');
        }

        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    let filteredTodos = [...todosState];

    switch (filterState.status) {
      case SortType.ALL:
        filteredTodos = todosState;
        break;

      case SortType.ACTIVE:
        filteredTodos = todosState.filter(todo => !todo.completed);
        break;

      case SortType.COMPLETED:
        filteredTodos = todosState.filter(todo => todo.completed);
        break;

      default:
        filteredTodos = todosState;
        break;
    }

    return filteredTodos.filter(todo => todo.title.toLowerCase().includes(filterState.query.toLowerCase()));
  }, [todosState, filterState]);

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
              <TodoList
                todos={visibleTodos}
              />
            </div>
          </div>
        </div>
      </div>

      {currentTodoState && <TodoModal />}
    </>
  );
};
