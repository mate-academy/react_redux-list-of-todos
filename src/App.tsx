/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useSelector, useDispatch } from 'react-redux';

import { getTodos, getUser } from './api';//

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { Status } from './types/Status';

import { RootState } from './app/store';
import { actions } from './features/currentTodo';
import { actions as todosActions } from './features/todos';
import { actions as userActions } from './features/selectedUser';

export const App: React.FC = () => {
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(true);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const filterState = useSelector((state: RootState) => state.filter);
  const todos = useSelector((state: RootState) => state.todos.todos);

  const currentTodo = useSelector<RootState, Todo | null>(
    (state) => state.currentTodo,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getTodos()
      .then((fetchedTodos) => {
        dispatch(todosActions.setTodos(fetchedTodos));
      })
      .finally(() => {
        setIsLoadingTodos(false);
      });
  }, []);

  const handleShowTodo = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
    setIsLoadingUser(true);

    getUser(todo.userId).then((user) => {
      dispatch(userActions.setUser(user));
      setIsLoadingUser(false);
    });
  };

  const filteredTodos = todos
    .filter((todo) => {
      switch (filterState.status) {
        case Status.all:
          return true;
        case Status.active:
          return !todo.completed;
        case Status.completed:
          return todo.completed;
        default:
          return true;
      }
    })
    .filter((todo) => {
      return todo.title
        .toLowerCase()
        .includes(filterState.query.trim().toLowerCase());
    });

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
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  handleShowTodo={handleShowTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          isLoadingUser={isLoadingUser}
        />
      )}
    </>
  );
};
