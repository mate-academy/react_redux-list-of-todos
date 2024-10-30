import { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { filterTodos } from './utils/filterTodos';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosSlice } from './features/todos';

export const App = () => {
  const todos = useAppSelector(state => state.todos);
  const todoDispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { query, category: todoCategory } = useAppSelector(
    state => state.filter,
  );

  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setTodos = useCallback(
    (newTodos: Todo[]) => {
      todoDispatch(todosSlice.actions.changeTodos(newTodos));
    },
    [todoDispatch],
  );

  const setTodosFromApi = useCallback(() => {
    getTodos()
      .then(setTodos)
      .catch(() => alert('Todos api is wrong!'))
      .finally(() => {
        setIsLoading(false);
      });
  }, [setTodos]);

  useEffect(() => {
    setTodosFromApi();
  }, [setTodosFromApi]);

  useEffect(() => {
    setVisibleTodos(() => {
      return filterTodos(todos, todoCategory, query);
    });
  }, [todos, todoCategory, query]);

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
              {isLoading && <Loader />}
              {!isLoading && <TodoList todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
