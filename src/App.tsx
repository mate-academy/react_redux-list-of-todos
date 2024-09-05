import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import {
  Loader,
  TodoFilter,
  TodoTableContainer,
  TodoModal,
} from './components';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './app/store';
// import { getTodosAsync } from './features/todos';
import { useAppSelector } from './app/hooks';
import { addTodos } from './features/todos';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const selectedTodo = useAppSelector(state => state.currentTodo.value);
  // const isLoading = useAppSelector(state => state.todos.isLoading);
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   dispatch(getTodosAsync());
  // }, []);
  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((todosFromServer: Todo[]) => {
        dispatch(addTodos(todosFromServer));
      })
      .finally(() => setIsLoading(false));
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

            <div className="block">
              {isLoading ? <Loader /> : <TodoTableContainer />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
