/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Status } from './types/Status';
import { useAppSelector } from './app/hooks';
import { actions as currTodoActions } from './features/currentTodo';

type FilterParams = {
  todosFromServer: Todo[],
  status: Status,
  query: string,
};

function getFilteredTodos({
  todosFromServer,
  status,
  query,
}: FilterParams) {
  let filteredTodos = todosFromServer;

  switch (status) {
    case 'active':
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
      break;

    case 'completed':
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      break;

    default:
      filteredTodos = [...filteredTodos];
  }

  const lowerQuery = query.toLowerCase();

  filteredTodos = filteredTodos.filter(
    todo => todo.title.toLowerCase().includes(lowerQuery),
  );

  return filteredTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const { status, query } = useAppSelector(state => state.filter);

  const [loaderIsShown, setLoaderIsShown] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  // const [todosStatus, setTodosStatus] = useState<Status>('all');
  // const [query, setQuery] = useState('');

  const setTodo = (todo: Todo) => dispatch(currTodoActions.setTodo(todo));
  const removeTodo = () => dispatch(currTodoActions.removeTodo());

  useEffect(() => {
    setTimeout(() => {
      setLoaderIsShown(false);
    }, 300);
  }, []);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        const filteredTodos = getFilteredTodos({
          todosFromServer,
          status,
          query,
        });

        setTodos(filteredTodos);
      });
  }, [todos, status, query]);

  const handleClick = async (todo: Todo) => {
    setTodo(todo);

    const currentUser = await getUser(todo.userId);

    setUser(currentUser);
  };

  const closeWindow = () => {
    removeTodo();
  };

  // const clearQuery = () => {
  //   setQuery('');
  // };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                // handleChange={setTodosStatus}
                // queryChange={setQuery}
                // clearQuery={clearQuery}
                // query={query}
              />
            </div>

            <div className="block">
              {loaderIsShown
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={todos}
                    selectedId={selectedTodo?.id}
                    handleClick={handleClick}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          user={user}
          todo={selectedTodo}
          closeWindow={closeWindow}
        />
      )}
    </>
  );
};
