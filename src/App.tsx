/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions } from './features/todos';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(true);
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const initialTodosList = () => {
    getTodos()
      .then((todos: Todo[]) => setTodosList(todos))
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    if (!todosList.length) {
      initialTodosList();
    } else {
      dispatch(actions.setTodos(todosList));
    }
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
              {loader && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
        {currentTodo && <TodoModal todo={currentTodo} />}
      </div>
    </>
  );
};
