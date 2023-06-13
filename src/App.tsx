/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { getTodos } from './api';
import filterTodos from './helper/filterTodos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  // const [todos, setTodos] = useState<Todo[]>([]);
  // const [hasError, setHasError] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  // const [statusToFilterBy, setStatusToFilterBy] = useState(StatusToFilterBy.All);
  // const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const todosFromServer = await getTodos();

        dispatch(todosActions.setTodos(todosFromServer));
      } finally {
        setIsLoading(false);
      }
    };

    getTodosFromServer();
  }, []);

  const filteredTodos = filterTodos(todos, filter);

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
                : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal todo={currentTodo} />
      )}
    </>
  );
};
