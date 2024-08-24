import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import { actions as actionTodos } from './features/todos';
import { Status } from './types/Status';

export const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const { query, status } = useSelector((state: RootState) => state.filter);
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    setIsLoadingTodos(true);

    getTodos()
      .then(receivedTodos => dispatch(actionTodos.setTodos(receivedTodos)))
      .finally(() => setIsLoadingTodos(false));
  }, [dispatch]);

  const visibleTodos = useMemo(() => {
    let filtredTodos = [...todos];

    switch (status) {
      case Status.completed:
        filtredTodos = filtredTodos.filter(todo => todo.completed);
        break;
      case Status.active:
        filtredTodos = filtredTodos.filter(todo => !todo.completed);
        break;
    }

    if (query) {
      filtredTodos = filtredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filtredTodos;
  }, [status, todos, query]);

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
              {isLoadingTodos ? <Loader /> : <TodoList todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
