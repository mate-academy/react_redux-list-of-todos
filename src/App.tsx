//#region imports
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { todosSlice } from './features/todos';
//#endregion

export const App = () => {
  //#region consts
  const dispatch = useDispatch();
  const { isLoading, error } = useAppSelector(state => state.todos);
  const { setTodos, setLoading, setError } = todosSlice.actions;
  const currentTodo = useAppSelector(state => state.currentTodo);
  //#endregion

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    getTodos()
      .then(todos => dispatch(setTodos(todos)))
      .catch(e => {
        dispatch(setError(e.message));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch, setError, setLoading, setTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {isLoading && <Loader />}

            {!isLoading && error && (
              <p className="notification is-danger is-light">{error}</p>
            )}

            {!isLoading && !error && (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  <TodoList />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
