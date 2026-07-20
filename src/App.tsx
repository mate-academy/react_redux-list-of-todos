import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';

import { getTodos } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from './features/todos';
import { useEffect, useState } from 'react';
import { RootState } from './app/store';
import { Todo } from './types/Todo';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const currentTodo = useSelector<RootState, Todo | null>(
    state => state.currentTodo,
  );

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todosArray => todosArray.map(todo => dispatch(addTodo(todo))))
      .finally(() => setIsLoading(false));
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
              {isLoading && <Loader />}
              {!isLoading && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
