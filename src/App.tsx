/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components';
import { TodoFilter } from './components';
import { TodoModal } from './components';
import { Loader } from './components';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodo } from './features/currentTodo';

export const App = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(query.toLowerCase().trim());

    let matchOption = true;

    if (status === 'active') {
      matchOption = !todo.completed;
    } else if (status === 'completed') {
      matchOption = todo.completed;
    }

    return matchesSearch && matchOption;
  });

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => dispatch(setTodos(data)))
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

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
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                onSelectedTodo={todo => dispatch(setTodo(todo))}
                selectedTodoId={selectedTodo?.id || null}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => dispatch(setTodo(null))}
        />
      )}
    </>
  );
};
