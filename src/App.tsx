import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { useAppSelector, useAppDispatch } from './app/hook';

export const App = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const userCurrent = useAppSelector(state => state.currentTodo);
  const [userInfo, setUserInfo] = useState(false);

  useEffect(() => {
    getTodos()
      .then(todos => {
        dispatch(setTodos(todos));
      })
      .catch(() => {
        setUserInfo(true);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 800);
      });
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

            {userInfo && <p>Sorry, there are no todos</p>}

            <div className="block">{loading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {userCurrent && <TodoModal />}
    </>
  );
};
