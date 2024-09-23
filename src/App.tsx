import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useCallback, useEffect } from 'react';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodosFromService } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();

  const { loadingTodos, selectedTodo } = useAppSelector(state => ({
    ...state.todosReducer,
    selectedTodo: state.todoReducer,
  }));

  const todosFromService = useCallback(
    () => getTodosFromService(dispatch),
    [dispatch],
  );

  useEffect(() => {
    todosFromService();
  }, [todosFromService]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {loadingTodos ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">{<TodoFilter />}</div>
                <div className="block">
                  <TodoList />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
