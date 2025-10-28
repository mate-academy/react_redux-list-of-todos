import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos } from './api';
import { setError, setLoading, setTodos } from './features/todos';
import { useAppSelector } from './app/hooks';
import { Todo } from './types/Todo';

export const App = () => {
  const { items: allTodos, isLoading } = useAppSelector(state => state.todos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading());

    getTodos()
      .then(todos => dispatch(setTodos(todos)))
      .catch(() => dispatch(setError('failed to load data')));
  }, [dispatch]);

  const amountOfTodos = allTodos.reduce((acc: number, curr: Todo) => {
    if (!curr.completed) {
      return acc + 1;
    }

    return acc;
  }, 0);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos: {amountOfTodos}</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">{isLoading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
