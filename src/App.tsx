/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { Todo } from './types/Todo';
import { actions } from './features/todos';
import { getTodos } from './api';

interface FiltersType {
  query: string;
  status: string;
}

export const App: React.FC = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const todos = useSelector<RootState, Todo[]>(state => state.todos);
  const filters = useSelector<RootState, FiltersType>(state => state.filter);

  const dispatch = useDispatch();

  useEffect(() => {
    getTodos().then(elem => dispatch(actions.setTodos(elem)));
  }, []);

  function filteredTodos() {
    return todos.filter(todo => todo.title.includes(filters.query));
  }

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
              {false && <Loader />}

              <TodoList
                todos={filteredTodos()}
                chousenTodo={selectedTodo}
                chooseTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {false && <TodoModal />}
    </>
  );
};
