import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos, getUser } from './api';
import { useDispatch } from 'react-redux';
import { setTodos } from './features/todos';
import { Todo } from './types/Todo';
import { saveTodo, saveUser } from './features/currentTodo';
// import { User } from './types/User';

export const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openerModalCard, setOpenerModalCard] = useState(false);

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

  const openerModalWindow = (userId: number, todo: Todo) => {
    setIsModalOpen(true);
    setOpenerModalCard(true);

    getUser(userId)
      .then(user => {
        setIsModalOpen(true);
        dispatch(
          saveUser({
            ...user,
          }),
        );

        dispatch(
          saveTodo({
            ...todo,
          }),
        );
      })
      .finally(() => {
        setTimeout(() => {
          setIsModalOpen(false);
        }, 300);
      });
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
      {openerModalCard && (
        <TodoModal
          isModalOpen={isModalOpen}
          setOpenerModalCard={setOpenerModalCard}
        />
      )}
    </>
  );
};
