/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { AppDispatch, RootState } from './app/store';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos: Todo[] = useSelector<RootState, Todo[]>((state) => state.todos);
  const selectedTodo: Todo | null = useSelector<RootState, Todo | null>(
    state => state.currentTodo,
  );
  const [loading, setloading] = useState(false);

  const fetchTodos = async () => {
    try {
      setloading(true);
      const todosFromServer: Todo[] = await getTodos();

      dispatch(todosActions.set(todosFromServer));
      setloading(false);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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
              {loading && <Loader />}
              <TodoList todos={todos} />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} />}
    </>
  );
};
