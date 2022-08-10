import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

import './App.scss';

import { actions, selectors } from './store';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTotos] = useState<Todo[]>([]);

  const selectedTodo = useSelector(selectors.selectedTodo);
  const isLoading = useSelector(selectors.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const loading = async () => {
      setTodosFromServer(await getTodos());
      setVisibleTotos(await getTodos());
      dispatch(actions.loadingActions.startLoading());
    };

    loading();
  }, []);

  const filtredTodos = (value: string, status: string) => {
    const todos = todosFromServer.filter(todo => {
      switch (status) {
        case 'completed':
          return todo.completed && todo.title.includes(value);
        case 'active':
          return !todo.completed && todo.title.includes(value);
        default:
          return todo.title.includes(value);
      }
    });

    setVisibleTotos(todos);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filtredTodos={filtredTodos} />
            </div>

            <div className="block">
              {!isLoading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={visibleTodos.find(todo => todo.id === selectedTodo.id)}
          onClose={() => dispatch(
            actions.selectedTodoActions.usSelectTodo(),
          )}
        />
      )}
    </>
  );
};
