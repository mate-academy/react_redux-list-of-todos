/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { useAppSelector } from './store';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [currentTodos, setCurrentTodos] = useState<Todo[] | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => todosFromServer
        .map(todo => ({
          ...todo,
          user: getUser(todo.userId),
        })))
      .then(todosFromServer => {
        setTodos([...todosFromServer]);
        setCurrentTodos([...todosFromServer]);
      });
  }, []);

  const visibleTodosInput = (query:string) => {
    const lowerQuery = query.toLowerCase();

    const filteredTodos = todos?.filter(todo => (
      todo.title.toLowerCase().includes(lowerQuery)
    ));

    if (filteredTodos) {
      setCurrentTodos(filteredTodos);
    }
  };

  const visibleTodosSelect = (selectOption:string) => {
    let filteredTodos;

    switch (selectOption) {
      case 'active':
        filteredTodos = todos?.filter(todo => todo.completed === false);

        if (filteredTodos) {
          setCurrentTodos(filteredTodos);
        }

        break;

      case 'completed':
        filteredTodos = todos?.filter(todo => todo.completed === true);

        if (filteredTodos) {
          setCurrentTodos(filteredTodos);
        }

        break;

      case 'all':
        setCurrentTodos(todos);

        break;

      default:
        break;
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter visibleTodosSelect={visibleTodosSelect} visibleTodosInput={visibleTodosInput} />
            </div>

            <div className="block">
              {todos ? (
                <TodoList todos={currentTodos} />
              ) : (
                <Loader />
              )}
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
