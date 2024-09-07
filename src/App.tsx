import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos, getUser } from './api';
import { useDispatch } from 'react-redux';
import { setTodos } from './features/todos';
import { Todo } from './types/Todo';
import { saveTodo } from './features/currentTodo';

export const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenerMOdal, setIsOpenerMOdal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todos => {
        dispatch(setTodos(todos));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const openerModalWindow = async (userId: number, todo: Todo) => {
    setIsOpenerMOdal(true);

    const user = await getUser(userId);

    dispatch(
      saveTodo({
        ...todo,
        user,
      }),
    );

    setTimeout(() => {
      setIsOpenerMOdal(false);
    }, 300);
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
              {isLoading && <Loader />}

              {!isLoading && <TodoList openerModalWindow={openerModalWindow} />}
            </div>
          </div>
        </div>
      </div>
      <TodoModal isOpenerMOdal={isOpenerMOdal} />
    </>
  );
};
