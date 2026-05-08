/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosSlice } from './features/todos';

type Filters = {
  status: Status;
  query: string;
};

function getPreparedTodos(todos: Todo[], { status, query }: Filters): Todo[] {
  let preparedTodos = [...todos];

  if (status) {
    switch (status) {
      case 'completed':
        preparedTodos = preparedTodos.filter(todo => todo.completed);
        break;
      case 'active':
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;
    }
  }

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    preparedTodos = preparedTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  return preparedTodos;
}

export const App: React.FC = () => {
  const [loader, setLoader] = useState(true);
  // const [todos, setTodos] = useState<Todo[]>([]);
  // const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  // const [status, setStatus] = useState<Status>('all');
  // const [query, setQuery] = useState('');

  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  useEffect(() => {
    getTodos()
      .then(data => dispatch(todosSlice.actions.setTodos(data)))
      .catch(error => error.message)
      .finally(() => setLoader(false));
  }, [dispatch]);

  const visibleGoods = getPreparedTodos(todos, { status, query });

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
              {loader && <Loader />}

              {!loader && todos.length > 0 && <TodoList todos={visibleGoods} />}

              {!loader && todos.length === 0 && 'No todos'}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} />}
    </>
  );
};
