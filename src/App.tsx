import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos } from './features/todos';
import { RootState } from './app/store';

export const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const todos = useSelector((state: RootState) => state.todosReducer);
  const selectedTodo = todos.find(todo => todo.selectedTodo);
  const [fetchErorr, setFetchErorr] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const todosByServer = await getTodos();

        dispatch(setTodos(todosByServer));
      } catch (error) {
        setFetchErorr(true);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {fetchErorr ? (
              <p>Something going wrong</p>
            ) : (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  {isLoading ? <Loader /> : <TodoList />}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal todo={selectedTodo} />}
    </>
  );
};
