import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from './app/store';
import * as todosActions from './features/todos';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const todosFilter = useAppSelector(state => state.filter);

  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then((todosFromServer: Todo[]) => {
        dispatch(todosActions.setTodos(todosFromServer));
      })
      .finally(() => setLoader(false));
  }, [dispatch]);

  const filterTodos = () => {
    let visTodos = todos;

    if (todosFilter.query.length !== 0) {
      visTodos = visTodos.filter(todo =>
        todo.title.toLowerCase().includes(todosFilter.query.toLowerCase()),
      );
    }

    if (todosFilter.status === 'completed') {
      visTodos = visTodos.filter(todo => todo.completed);
    }

    if (todosFilter.status === 'active') {
      visTodos = visTodos.filter(todo => !todo.completed);
    }

    return visTodos;
  };

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
              {loader ? <Loader /> : <TodoList todos={filterTodos()} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo !== null && <TodoModal />}
    </>
  );
};
