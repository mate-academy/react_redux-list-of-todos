import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { getFilteredTodos } from './services/getFilteredTodos';
import { useAppSelector } from './app/store';
import { useDispatch } from 'react-redux';
import { actions as todosActions } from './features/todos';
import { actions as currentTodoActions } from './features/currentTodo';

export const App: React.FC = () => {
  const todos = useAppSelector(state => {
    return state.todos;
  });

  const filter = useAppSelector(state => {
    return state.filter;
  });

  const currentTodo = useAppSelector(state => {
    return state.currentTodo;
  });

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(value => dispatch(todosActions.set(value)))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleModalClose = () => {
    dispatch(currentTodoActions.set(null));
  };

  const preparedTodos = getFilteredTodos(todos, filter);

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
              {loading && <Loader />}
              <TodoList todos={preparedTodos} />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal todo={currentTodo} onClose={handleModalClose} />
      )}
    </>
  );
};
