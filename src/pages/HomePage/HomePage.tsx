import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { TodoFilter } from '../../components/TodoFilter';
import { TodoList } from '../../components/TodoList';
import { TodoModal } from '../../components/TodoModal';
import {
  useAppDispatch,
  useAppSelector,
} from '../../app/hooks';
import { getTodos } from '../../api';
import { actions as todosActions } from '../../features/todos';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const todo = useAppSelector(state => state.currentTodo);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getTodoList = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const todoList = await getTodos();

      dispatch(todosActions.setTodos(todoList));
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">
              Todos:
            </h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}

              {!isLoading
                && !isError
                && (
                  <TodoList />
                )}
            </div>
          </div>
        </div>
      </div>

      {todo && (
        <TodoModal />
      )}

      {isError && (
        <div
          className="
            container
            box
            notification
            is-danger
            is-light"
        >
          Oh, no! Error during loading data from server!
        </div>
      )}
    </>
  );
};
