import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect } from 'react';

import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { setCurrentTodo, clearCurrentTodo } from './features/currentTodo';

export const App = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo.todo);
  const loading = useAppSelector(state => state.currentTodo.loading);

  useEffect(() => {
    getTodos().then(todosFromServer => {
      dispatch(setTodos(todosFromServer));
    });
  }, [dispatch]);

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title
      .toLowerCase()
      .includes(filter.query.toLowerCase());

    const matchesStatus =
      filter.status === 'all'
      || (filter.status === 'active' && !todo.completed)
      || (filter.status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });

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
              <Loader />
              <TodoList
                todos={filteredTodos}
                selectedTodoId={currentTodo?.id ?? null}
                onSelect={todo => dispatch(setCurrentTodo(todo))}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todo={currentTodo}
        loading={loading}
        onClose={() => dispatch(clearCurrentTodo())}
      />
    </>
  );
};