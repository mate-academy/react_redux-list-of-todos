/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { Condition } from './types/Condition';

import { getTodos } from './api';

import { actions as loadingActions } from './store/loadingReducer';
import { actions as currentTodoReducer } from './store/currentTodoReducer';
import { selectors } from './store';

import 'bulma/css/bulma.css';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  const loading = useSelector(selectors.getLoading);
  const selectedTodo = useSelector(selectors.getTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingActions.startLoading());

    const loadTodos = async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
        setVisibleTodos(todosFromServer);
        dispatch(loadingActions.finishLoading());
        setHasLoadingError(false);
      } catch (error) {
        setHasLoadingError(true);
        dispatch(loadingActions.finishLoading());
      }
    };

    loadTodos();
  }, []);

  const filterTodos = (value: string, condition: string) => {
    const newTodo = todos.filter(todo => {
      switch (condition) {
        case Condition.active:
          return todo.title.includes(value) && !todo.completed;
        case Condition.completed:
          return todo.title.includes(value) && todo.completed;
        default:
          return todo.title.includes(value);
      }
    });

    setVisibleTodos(newTodo);
  };

  const select = (todoId: number) => (
    dispatch(currentTodoReducer.setTodo(todoId))
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilter={filterTodos} />
            </div>

            <div className="block">
              {loading
                ? <Loader />
                : (
                  <TodoList
                    onSelect={select}
                    selectedTodo={selectedTodo}
                    todos={visibleTodos}
                  />
                )}
            </div>
            {hasLoadingError && (
              <div className="block">
                404 - Not Found
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedTodo > 0 && (
        <TodoModal
          todo={visibleTodos.find(todo => todo.id === selectedTodo)}
          onSelect={select}
        />
      )}
    </>
  );
};
