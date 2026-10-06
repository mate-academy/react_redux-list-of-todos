import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { actions as todosActions } from './features/todos';
import { useAppSelector } from './app/hooks';

export const App = () => {
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    getTodos()
      .then(todos => {
        dispatch(todosActions.add(todos));
      })
      .finally(() => setIsLoadingTodos(false));
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {!isLoadingTodos && (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>
              </>
            )}

            <div className="block">
              {isLoadingTodos ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
