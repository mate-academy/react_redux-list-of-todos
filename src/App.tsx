import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppSelector } from './hooks/useAppSelector';
import { useEffect } from 'react';
import { todosActions } from './features/todos';
import { useAppDispatch } from './hooks/useAppDispatch';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

function filterTodos(todos: Todo[], query: string, status: Status) {
  let readyTodos: Todo[] = [];

  switch (status) {
    case 'all':
      readyTodos = todos;
      break;
    case 'completed':
      readyTodos = todos.filter(todo => todo.completed);
      break;
    case 'active':
      readyTodos = todos.filter(todo => !todo.completed);
      break;

    default:
      readyTodos = [];
  }

  const normalaizedQuery = query.toLowerCase();

  return readyTodos.filter(item =>
    item.title.toLowerCase().includes(normalaizedQuery),
  );
}

export const App = () => {
  const dispatch = useAppDispatch();

  const { loading, todos } = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.fillters);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const visibleTodos = filterTodos(todos, query, status);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch(todosActions.startFetch());

      try {
        const todosArr = await getTodos();

        dispatch(todosActions.successFetch(todosArr));
      } catch {
        dispatch(todosActions.errorFetch('Todos fetch was error('));
      }
    };

    fetchTodos();
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
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  loading={loading}
                  selectItemId={currentTodo?.id || 0}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal />}
    </>
  );
};
