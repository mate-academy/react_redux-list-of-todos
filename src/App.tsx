/* eslint-disable max-len */
import React, { ChangeEvent, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { actions as todosActions } from './features/todos';
import { actions as filterActions } from './features/filter';

import { useAppSelector } from './app/hooks';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { Status } from './types/Status';
import * as api from './api';

export const App: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  const [user, setUser] = useState<User | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const addTodos = (value: Todo[]) => dispatch(todosActions.add(value));
  const setQuery = (text: string) => dispatch(filterActions.filterQuery(text));
  const getTodos = async () => {
    const todosFromServer = await api.getTodos();

    addTodos(todosFromServer);
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (query[0] === ' ') {
      setQuery('');
    }
  }, [query]);

  const loadUser = async () => {
    if (selectedUserId !== null) {
      // eslint-disable-next-line
      const userFromServer = await api.getUser(selectedUserId);

      setUser(userFromServer);
    }
  };

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    return setQuery(event.target.value);
  };

  const handleQueryReset = () => {
    return setQuery('');
  };

  const changeUserId = (userId: number | null) => {
    setSelectedUserId(userId);
  };

  const resetUser = () => {
    setUser(null);
  };

  const updateTodos = () => {
    let visibleTodos = [...todos];

    if (status === Status.active) {
      visibleTodos = [...todos].filter(
        (todo: Todo) => todo.completed === false,
      );
    }

    if (status === Status.completed) {
      visibleTodos = [...todos].filter(
        (todo: Todo) => todo.completed === true,
      );
    }

    visibleTodos = visibleTodos.filter(
      (todo: Todo) => todo.title.toLocaleLowerCase().includes(query.toLowerCase().trim()),
    );

    return visibleTodos;
  };

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter
              query={query}
              filter={status}
              handleChange={handleChangeQuery}
              handleReset={handleQueryReset}
            />
          </div>

          <div className="block">
            {todos.length ? (
              <TodoList
                todos={updateTodos()}
                changeUserId={changeUserId}
              />
            ) : (
              <Loader />
            )}
          </div>
        </div>
        {selectedUserId && (
          <TodoModal
            selectedUser={user}
            changeUserId={changeUserId}
            loadUser={loadUser}
            resetUser={resetUser}
          />
        )}
      </div>
    </div>
  );
};
