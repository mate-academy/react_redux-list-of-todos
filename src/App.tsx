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
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosActions } from './features/todos';

export const App: React.FC = () => {
  const { items: todos, loaded } = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const [todosToShow, setTodosToShow] = useState(todos);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(todosActions.startLoading());

    getTodos().then((todosFromServer) => {
      dispatch(todosActions.setTodos(todosFromServer));
      setTodosToShow(todosFromServer);
      dispatch(todosActions.finishLoading());
    });
  },
  [selectedTodo]);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(currentUser => setSelectedUser(currentUser));
    }
  }, [modal]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                onSettingTodo={setTodosToShow}
              />
            </div>

            <div className="block">
              {!loaded
                ? <Loader />
                : (
                  <TodoList
                    todos={todosToShow}
                    onSetSelectedTodo={setSelectedTodo}
                    onSettingModal={setModal}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <TodoModal
          selectedTodo={selectedTodo}
          selectedUser={selectedUser}
          onSelectTodo={setSelectedTodo}
          onSettingSelectedUser={setSelectedUser}
          onSettingModal={setModal}
        />
      )}
    </>
  );
};
