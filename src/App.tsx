import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { setCurrentTodo } from './features/currentTodo';
import { Todo } from './types/Todo';
import { useAppDispatch } from './app/hooks';
// import { setCurrentTodo } from './features/currentTodo';

export const App = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loadingModal, setLoadingModal] = useState<boolean>(false);

  const handleTodoClick = (todo: Todo) => {
    setLoadingModal(true);
    dispatch(setCurrentTodo(todo));
    setIsModalOpen(true);

    setTimeout(() => setLoadingModal(false), 2000);
  };

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => {
        dispatch(setTodos(data));
      })
      .finally(() => {
        setIsLoading(false);
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

            <div className="block">
              {!isLoading ? (
                <TodoList
                  handleTodoClick={handleTodoClick}
                  isModalOpen={isModalOpen}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal
          loadingModal={loadingModal}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};
