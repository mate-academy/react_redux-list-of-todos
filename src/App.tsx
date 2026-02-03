import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';
import { useDispatch } from 'react-redux';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { todos } = useAppSelector(state => state.todos);
  const { currentTodo } = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos().then(todosFromServer => dispatch(setTodos(todosFromServer)));
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos: </h1>
            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {!todos.length ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>
      {currentTodo ? <TodoModal /> : ''}
    </>
  );
};
