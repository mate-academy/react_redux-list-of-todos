import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './hooks/useAppSelector';
import { todosSlice } from './features/todos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodoId = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todosFromServer => {
        dispatch(todosSlice.actions.loadTodos(todosFromServer));
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  const selectedTodo = useMemo(() => {
    return filteredTodos.find(todo => todo.id === selectedTodoId);
  }, [filteredTodos, selectedTodoId]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} handleFilterChange={setFilteredTodos} />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} />}
    </>
  );
};
