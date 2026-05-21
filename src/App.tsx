/* eslint-disable @typescript-eslint/no-shadow */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const [inUse, setInUse] = useState(false);
  const [loader, setLoader] = useState(false);
  const [todoModalUse, setTodoModalUse] = useState(false);

  useEffect(() => {
    setLoader(true);

    getTodos().then(todos => {
      dispatch(setTodos(todos));
    });

    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, [dispatch]);

  const filtered = (() => {
    const base =
      filter.status === 'active'
        ? todos.filter(t => !t.completed)
        : filter.status === 'completed'
          ? todos.filter(t => t.completed)
          : todos;

    const q = filter.query.trim().toLowerCase();

    return q ? base.filter(t => t.title.toLowerCase().includes(q)) : base;
  })();

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
              {!loader && (
                <TodoList
                  setTodoModalUse={setTodoModalUse}
                  todoModalUse={todoModalUse}
                  todos={filtered}
                  inUse={inUse}
                  setInUse={setInUse}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        setTodoModalUse={setTodoModalUse}
        setInUse={setInUse}
        inUse={inUse}
      />
    </>
  );
};
