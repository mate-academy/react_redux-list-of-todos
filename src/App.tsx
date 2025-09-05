import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { getTodos, getUser } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as currentTodoActions } from './features/currentTodo';
import { actions as filterActions } from './features/filter';
import { actions as todosActions } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo.currentTodo);
  const isUserLoading = useAppSelector(
    state => state.currentTodo.isUserLoading,
  );
  const assignedUser = useAppSelector(state => state.currentTodo.assignedUser);
  const searchValue = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const todos = useAppSelector(state => state.todos.todos);
  const isTodosLoading = useAppSelector(state => state.todos.isTodosLoading);

  //const [pickedTodo, setPickedTodo] = useState<Todo | null>(null);
  //const [isUserLoading, setIsUserLoading] = useState<boolean>(true);
  //const [assignedUser, setAssignedUser] = useState<User | null>(null);

  //const [isTodosLoading, setIsTodosLoading] = useState<boolean>(true);
  //const [todos, setTodos] = useState<Todo[] | null>(null);
  //const [searchValue, setSearchValue] = useState<string>('');
  //const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    dispatch(todosActions.setIsTodosLoading(true));
    getTodos()
      .then(data => {
        dispatch(todosActions.setTodos(data));
      })
      .catch()
      .finally(() => {
        dispatch(todosActions.setIsTodosLoading(false));
      });
  }, [dispatch]);

  useEffect(() => {
    if (currentTodo?.userId) {
      dispatch(currentTodoActions.setIsUserLoading(true));
      getUser(currentTodo.userId)
        .then(data => {
          dispatch(currentTodoActions.setAssignedUser(data));
        })
        .catch(() => dispatch(currentTodoActions.setAssignedUser(null)))
        .finally(() => {
          dispatch(currentTodoActions.setIsUserLoading(false));
        });
    } else {
      dispatch(currentTodoActions.setAssignedUser(null));
    }
  }, [currentTodo, dispatch]);

  const filteredTodos = todos?.filter(todo => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchValue.toLowerCase());

    const matchesStatus =
      status === 'all'
        ? true
        : status === 'active'
          ? !todo.completed
          : todo.completed;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchValue={searchValue}
                onSearchChange={value =>
                  dispatch(filterActions.setSearchValue(value))
                }
                onClear={() => dispatch(filterActions.setSearchValue(''))}
                status={status}
                onStatusChange={value =>
                  dispatch(filterActions.setStatus(value))
                }
              />
            </div>

            <div className="block">
              {isTodosLoading ? <Loader /> : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal
          todo={currentTodo}
          user={assignedUser}
          isLoading={isUserLoading}
        />
      )}
    </>
  );
};
