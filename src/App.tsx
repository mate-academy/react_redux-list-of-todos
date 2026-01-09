/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos, setLoading as setReduxLoading } from './features/todos';

export const App: React.FC = () => {
  // const [todos, setTodos] = useState<Todo[]>([]);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.todos);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(setReduxLoading(true));

    getTodos()
      .then(todosFromServer => {
        dispatch(setTodos(todosFromServer));
      })
      .finally(() => {
        setLoading(false);
        dispatch(setReduxLoading(false));
      });
  }, [dispatch]);

  const handleSelectingTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
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
              {isLoading || loading ? (
                <Loader />
              ) : (
                <TodoList
                  selectedTodoId={selectedTodo?.id}
                  onSelectTodo={handleSelectingTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
