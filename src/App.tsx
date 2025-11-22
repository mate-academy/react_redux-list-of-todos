import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { setTodos, setLoading, setNotif } from './features/todos';
import { useEffect } from 'react';
import { UseAppSelector } from './hooks';

export const App = () => {
  const { loading } = UseAppSelector((state: RootState) => state.todos);
  const { currentTodo } = UseAppSelector(
    (state: RootState) => state.currentTodo,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setNotif(''));

    getTodos()
      .then(result => {
        if (result.length === 0) {
          dispatch(setNotif('Todo list is empty'));
        }

        dispatch(setTodos(result));
      })
      .catch(() => {
        dispatch(setNotif('Something went wroung'));
      })
      .finally(() => dispatch(setLoading(false)));
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

            <div className="block">{loading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {currentTodo !== null && <TodoModal />}
    </>
  );
};
