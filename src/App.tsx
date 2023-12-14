/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { EStatus } from './features/filter';
import { Todo } from './types/Todo';

interface IFilterOptions {
  status: EStatus;
  query: string;
}

const filterTodos = (todos: Todo[], options:IFilterOptions): Todo[] => {
  const { status = EStatus, query = '' } = options;
  let filteredTodos = [...todos];

  if (status) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (status) {
        case EStatus.ACTIVE: {
          return !todo.completed;
        }

        case EStatus.COMPLETED: {
          return todo.completed;
        }

        default: {
          return true;
        }
      }
    });
  }

  if (query) {
    const queryToLower = query.toLowerCase();

    filteredTodos = filteredTodos.filter(({ title }) => title.toLowerCase().includes(queryToLower));
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const apiTodos = await getTodos();

        dispatch(todosActions.setTodos(apiTodos));

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>
                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  <TodoList todos={filterTodos(todos, { status, query })} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal />
      )}
    </>
  );
};
