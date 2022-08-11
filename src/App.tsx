/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { selectors } from './store';
import { actions as loadingActions } from './store/loading';
import { actions as todosActions } from './store/todos';
import { actions as todoActions } from './store/selectedTodo';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.loading);
  const todos = useSelector(selectors.todos);
  const selectedTodo = useSelector(selectors.todo);

  const filterInput = (todo: Todo) => todo.title.toLowerCase().includes(query.toLowerCase());
  const filterStatus = (todo: Todo, todoStatus: string) => {
    switch (todoStatus) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return todo;
    }
  };

  const visibleTodos = todos
    .filter(filterInput)
    .filter((todo) => filterStatus(todo, status));

  useEffect(() => {
    dispatch(loadingActions.startLoading());
    const loadTodos = () => {
      getTodos().then(todosFromServer => {
        dispatch(todosActions.setTodos(todosFromServer));
      }).finally(() => dispatch(loadingActions.finishLoading()));
    };

    loadTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {
                isLoading
                  ? <Loader />
                  : (
                    <>
                      <TodoList
                        todos={visibleTodos}
                        selectedTodo={selectedTodo}
                      />
                    </>
                  )
              }
            </div>
          </div>
        </div>
        {selectedTodo && (
          <TodoModal
            todo={selectedTodo}
            onClose={() => {
              dispatch(todoActions.setTodo(null));
            }}
          />
        )}
      </div>
    </>
  );
};
