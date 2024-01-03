/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { Status } from './types/Status';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as TodosActions } from './features/todos';

const applyFilter = (todos: Todo[], filter: Status) => {
  const conditions = {
    [Status.All]: () => {
      return todos;
    },
    [Status.Active]: () => {
      return todos.filter(todo => !todo.completed);
    },
    [Status.Completed]: () => {
      return todos.filter(todo => todo.completed);
    },
  };

  return conditions[filter]();
};

export const App: React.FC = () => {
  const { todos, currentTodo } = useAppSelector(state => state);
  const { filter, query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getTodos().then(res => {
        dispatch(TodosActions.getTodos(res));
      });

      setIsLoading(false);
    }, 1000);
  }, [dispatch]);

  if (currentTodo) {
    getUser(currentTodo.userId)
      .then(setUser);
  }

  let filteredTodos = applyFilter(todos, filter);

  if (query) {
    filteredTodos = filteredTodos.filter(
      todo => todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

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
                ? <Loader />
                : (
                  <TodoList todos={filteredTodos} />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          user={user}
          selectedTodo={currentTodo}
        />
      )}
    </>
  );
};
