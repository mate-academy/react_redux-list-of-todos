import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { TodoStyles } from './types/TodoStyles';
import { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { Status } from './types/Status';
import { setTodos } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const query = useSelector<RootState, string>(state => state.filter.query);
  const status = useSelector<RootState, Status>(state => state.filter.status);
  const visibleTodos = useSelector<RootState, [] | Todo[]>(
    state => state.todos.todos,
  );

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todos => dispatch(setTodos(todos)))
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = visibleTodos
    .filter(todo => {
      switch (status) {
        case TodoStyles.ACTIVE:
          return !todo.completed;
        case TodoStyles.COMPLETED:
          return todo.completed;
        default:
          return true;
      }
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

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
              {loading ? <Loader /> : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
