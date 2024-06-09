/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';

import { actions as todosActions } from './features/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useDispatch();

  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([...todos]);

  useEffect(() => {
    getTodos()
      .then((todosFromApi: Todo[]) =>
        dispatch(todosActions.setTodos(todosFromApi)),
      )
      .catch(() => {
        alert("Couldn't fetch the todos");
      });
  }, [dispatch]);

  useEffect(() => {
    let todosCopy = [...todos];

    switch (filter.filter) {
      case 'all':
        break;
      case 'active':
        todosCopy = todosCopy.filter((todo: Todo) => todo.completed === false);
        break;
      case 'completed':
        todosCopy = todosCopy.filter((todo: Todo) => todo.completed === true);
        break;
    }

    todosCopy = todosCopy.filter((todo: Todo) =>
      todo.title.toLocaleLowerCase().includes(filter.query.toLocaleLowerCase()),
    );

    setDisplayedTodos(todosCopy);
  }, [filter.filter, filter.query, todos]);

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
              {todos.length ? <TodoList todos={displayedTodos} /> : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
