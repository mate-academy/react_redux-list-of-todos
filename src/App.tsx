/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { FilterField } from './types/FilterField';
import { useAppSelector } from './hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { setTodos } from './features/todoSlice';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { todos } = useAppSelector(state => state.todos);
  const { filterField, query } = useAppSelector(state => state.filter);
  const { selectedTodo } = useAppSelector(state => state.selectedTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todosFromServer => {
        dispatch(setTodos(todosFromServer));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos;

    switch (filterField) {
      case FilterField.Active:
        filteredTodos = todos.filter(todo => !todo.completed);
        break;
      case FilterField.Completed:
        filteredTodos = todos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (query.trim()) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filteredTodos;
  }, [filterField, query, todos]);

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
              {loading ? <Loader /> : <TodoList todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
