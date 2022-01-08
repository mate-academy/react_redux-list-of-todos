import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser/CurrentUser';
import { TodoListFilters } from './components/TodoListFilters/TodoListFilters';
import { FilterTodoStatus } from './types/filterTodoStatus';
import './App.scss';
import { actions as actionsTodos } from './store/todos';
import { actions as actionsSelectedUser } from './store/selectedUser';
import { RootReducer } from './store';
import { User } from './types/user';

const App: FC = () => {
  const dispatch = useDispatch();

  const listStatusFilter = useMemo(() => {
    return Object.values(FilterTodoStatus);
  }, []);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const todos = useSelector((state: RootReducer) => state.todos.todos);
  const selectedUser: User | null = useSelector((state: RootReducer) => state.selectedUser.user);
  const status = useSelector((state: RootReducer) => state.todos.showStatus);

  // eslint-disable-next-line no-console
  console.log(selectedUser);

  let modifyTodos = todos;

  useEffect(() => {
    dispatch(actionsTodos.fetchTodos());
  }, []);

  useEffect(() => {
    if (selectedUser?.id !== selectedUserId) {
      dispatch(actionsSelectedUser.fetchUser(selectedUserId));
    }
  }, [selectedUserId]);

  const filterByQuery = () => {
    modifyTodos = modifyTodos.filter(todo => {
      const query = appliedQuery.toLowerCase();
      const todoTitle = todo.title.toLowerCase();

      return todoTitle.includes(query);
    });
  };

  const sortByStatus = () => {
    switch (status) {
      case FilterTodoStatus.All:
        modifyTodos = todos;
        break;

      case FilterTodoStatus.Completed:
        modifyTodos = modifyTodos.filter(todo => todo.completed);
        break;

      case FilterTodoStatus.NotCompleted:
        modifyTodos = modifyTodos.filter(todo => !todo.completed);
        break;

      default:
        break;
    }
  };

  const applyQuery = useCallback(
    debounce((newQuery) => {
      setAppliedQuery(newQuery);
    }, 1000),
    [],
  );

  if (status.length) {
    sortByStatus();
  }

  if (searchQuery.length) {
    filterByQuery();
  }

  const handleSetUserId = useCallback((id: number) => {
    if (id !== selectedUserId) {
      setSelectedUserId(id);
    }
  }, [selectedUserId]);

  const handleQuery = (newQuery: string) => {
    setSearchQuery(newQuery);
    applyQuery(newQuery);
  };

  const handleStatus = (newStatus: string) => {
    dispatch(actionsTodos.setStatus(newStatus));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 mb-3">
            <h1>Redux list of todos</h1>
          </div>
          <div className="col-sm-8">
            <TodoListFilters
              query={searchQuery}
              setQuery={handleQuery}
              dropdownList={listStatusFilter}
              status={status}
              handleStatus={handleStatus}
            />
            <TodoList
              todos={modifyTodos}
              handleSetUserId={handleSetUserId}
              selectedUserId={selectedUserId}
            />
          </div>
          <div className="col-sm-4">
            <CurrentUser
              user={selectedUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
