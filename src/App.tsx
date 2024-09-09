import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos, getUser } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos } from './features/todos';
import { CurrentTodo, Todo } from './types/Todo';
import { saveTodo } from './features/currentTodo';
import { RootState } from './app/store';

export const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentTodo = useSelector<RootState, CurrentTodo | null>(
    state => state.currentTodoSlice.currentTodo,
  );

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
    setIsModalOpen(true);

    const user = await getUser(userId);

    dispatch(
      saveTodo({
        ...todo,
        user,
      }),
    );

    setTimeout(() => {
      setIsModalOpen(false);
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
      {currentTodo?.user && (
        <TodoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
};
