/* eslint-disable react-hooks/exhaustive-deps */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect, useState } from 'react';
import { todosSlice } from './features/todos';
import { getTodos } from './api';
import { StatusType } from './features/filter';

export const App = () => {
  const { setTodos } = todosSlice.actions;

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);

  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setIsLoad(true);

    getTodos()
      .then(response => {
        let queried = response.filter(todo =>
          todo.title.toLowerCase().includes(filter.query.toLowerCase()),
        );

        switch (filter.status) {
          case StatusType.ACTIVE: {
            queried = queried.filter(todo => !todo.completed);

            break;
          }

          case StatusType.COMPLETED: {
            queried = queried.filter(todo => todo.completed);

            break;
          }
        }

        dispatch(setTodos(queried));
      })
      .finally(() => {
        setIsLoad(false);
      });
  }, [filter]);

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
              {isLoad && <Loader />}
              {!isLoad && <TodoList todos={todos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
