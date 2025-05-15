import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect, useState } from 'react';
import { fetchTodos } from './features/todos';
import { RootState } from './app/store';
export const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const { todos, status, error } = useAppSelector(
    (state: RootState) => state.todos,
  );

  const currentTodo = useAppSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const filteredTodos = () => {
    return todos
      .filter(todo => {
        switch (filter.status) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          case 'all':
          default:
            return true;
        }
      })
      .filter(todo =>
        todo.title.toLowerCase().includes(filter.query.toLowerCase()),
      );
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter status={filter.status} query={filter.query} />
            </div>

            <div className="block">
              {status === 'loading' ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos()}
                  status={status}
                  error={error}
                  currentTodo={currentTodo}
                  setIsModalOpen={setIsModalOpen}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal
          currentTodo={currentTodo}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      )}
    </>
  );
};
