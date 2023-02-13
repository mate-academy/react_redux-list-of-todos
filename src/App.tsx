/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { useAppSelector } from './app/hooks';
import { addTodos } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { todos, filter, currentTodo } = useAppSelector(state => state);
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(false);

  const getFilteredTodos = () => {
    let filteredTodos = [...todos];

    switch (filter.status) {
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (filter.query) {
      filteredTodos = filteredTodos
        .filter(todo => todo.title.toLowerCase()
          .includes(filter.query.toLowerCase()));
    }

    return filteredTodos;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingTodos(true);
        const todosFromServer: Todo[] = await getTodos();

        dispatch(addTodos(todosFromServer));
      } catch {
        throw new Error('Failed to load todos from server');
      } finally {
        setIsLoadingTodos(false);
      }
    };

    fetchData();
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
              {isLoadingTodos ? <Loader />
                : (<TodoList todos={getFilteredTodos()} />)}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal />
      )}
    </>
  );
};
