import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

//components
import { Loader, TodoFilter, TodoList, TodoModal } from './components';

//hooks
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './hooks';

//api
import { getTodos } from './api';

//store
import { actions as todosActions } from './features/todos';

export const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title
      .toLowerCase()
      .includes(filter.query.toLowerCase());

    const matchesStatus =
      filter.status === 'all' ||
      (filter.status === 'active' && !todo.completed) ||
      (filter.status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        const data = await getTodos();

        dispatch(todosActions.set(data));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
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
              {isLoading ? <Loader /> : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
