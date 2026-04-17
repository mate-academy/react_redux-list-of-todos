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
  const { todo } = useAppSelector(state => state.currentTodo);

  const { query, status } = useAppSelector(state => state.filter);

  useEffect(() => {
    getTodos().then(todos => {
      dispatch(setTodos(todos));
    });
  }, [dispatch]);

  const filteredTodos = todos.filter(todoItem => {
    const matchesQuery = todoItem.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesStatus =
      status === 'all'
        ? true
        : status === 'active'
        ? !todoItem.completed
        : todoItem.completed;

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
                selectedTodoId={todo?.id ?? null}
                onSelect={(todoItem) => dispatch(setCurrentTodo(todoItem))}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todo={todo}
        onClose={() => dispatch(clearCurrentTodo())}
      />
    </>
  );
};