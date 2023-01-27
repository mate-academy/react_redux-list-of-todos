/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions } from './features/todos';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // const [todosFromAPI, setTodosFromAPI] = useState<Todo[]>();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const todos = useAppSelector(state => state.todos);
  const query = useAppSelector(state => state.filter.query);
  const filter = useAppSelector(state => state.filter.status);
  const dispatch = useDispatch();
  const visibleTodos = todos.filter(todo => {
    if (todo.title.toLowerCase().includes(query.toLowerCase())) {
      switch (filter) {
        case 'all':
          return true;
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        default:
          return false;
      }
    }

    return false;
  });

  const setTodos = (todosAPI: Todo[] = []) => dispatch(actions.setTodos(todosAPI));

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const unsetSelectedTodo = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    getTodos()
      // .then(todosAPI => setTodosFromAPI(todosAPI))
      .then((todosFromAPI) => setTodos(todosFromAPI))
      .finally(() => setIsLoading(false));
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
              {isLoading && <Loader />}
              {(!isLoading && todos.length) > 0 && (
                <TodoList
                  todos={visibleTodos}
                  selectTodo={selectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} unsetSelectedTodo={unsetSelectedTodo} />
      )}
    </>
  );
};
