/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { actions } from './features/todos';
import { RootState } from './app/store';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const { setTodosAction, todosAreLoadingAction } = actions;
  const dispatch = useDispatch();

  const selectAreTodosAreLoading = (state: RootState) => state.todos.isLoading;
  const selectCurrentTodo = (state: RootState) => state.currentTodo;
  const selectFilterOption = (state: RootState) => state.filter.status;
  const selectQuery = (state: RootState) => state.filter.query;

  const areTodosAreLoading: boolean = useSelector(selectAreTodosAreLoading);
  const currentTodo = useSelector(selectCurrentTodo);
  const filterOption = useSelector(selectFilterOption);
  const query = useSelector(selectQuery);

  const selectTodosByCreterea = (state: RootState): Todo[] => {
    const todos = state.todos.todos;

    const askedTodos = todos.filter(todo => {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    });

    switch (filterOption) {
      case 'all':
        return askedTodos;
      case 'active':
        return askedTodos.filter(todo => !todo.completed);
      case 'completed':
        return askedTodos.filter(todo => todo.completed);
      default:
        return askedTodos;
    }
  };

  const allTodos: Todo[] = useSelector(selectTodosByCreterea);

  useEffect(() => {
    todosAreLoadingAction(true);

    getTodos()
      .then(todos => dispatch(setTodosAction(todos)))
      .catch((error) => {
        throw new Error(error);
      })
      .finally(() => todosAreLoadingAction(false));
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
              { areTodosAreLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={allTodos}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
