import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as todosActions from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();
  const { todos, loaded, selectedTodo } = useAppSelector(state => state.todos);

  useEffect(() => {
    dispatch(todosActions.init());
  }, []);

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
              {loaded ? <Loader /> : <TodoList todos={todos} selectedTodo={selectedTodo} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} />}
    </>
  );
};
