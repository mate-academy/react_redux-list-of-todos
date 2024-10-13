import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import { setTodosList } from './features/todos';

export const App = () => {
  const dispatch = useDispatch();
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const todoList = useSelector((state: RootState) => state.todos);
  const filter = useSelector((state: RootState) => state.filter);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const todosGetter = await getTodos();

        dispatch(setTodosList(todosGetter));
      } catch {
        alert('May be some problem with todos loading. Try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [dispatch]);

  const filteredTodos = useMemo(() => {
    const { status, query } = filter;
    const filteredList = todoList.filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed && todo.title.includes(query);
        case 'completed':
          return todo.completed && todo.title.includes(query);
        default:
          return todo && todo.title.includes(query);
      }
    });

    return filteredList;
  }, [todoList, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  <TodoList todos={filteredTodos} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
