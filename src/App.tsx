import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { addTodos } from './features/todos';
import { Todo } from './types/Todo';
import { useAppSelector } from './app/hooks';
import { FilterType } from './features/filter';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { todos, filter } = useAppSelector(state => state);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(false);

  const getFilteredTodos = () => {
    let filteredTodos = [...todos];

    switch (filter.status) {
      case FilterType.ACTIVE:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case FilterType.COMPLETED:
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

      {currentTodo && <TodoModal />}
    </>
  );
};
