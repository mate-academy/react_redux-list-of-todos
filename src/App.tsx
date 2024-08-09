import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/store';
import { setTodos } from './features/todos';
import { getTodos } from './api';
import { Todo } from './types/Todo';

enum FilterStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App = () => {
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [noFetchedTodos, setNoFetchedTodos] = useState(false);
  const currentTodo = useAppSelector(store => store.currentTodo);
  const selectedStatus = useAppSelector(store => store.filter.status);
  const currentQuery = useAppSelector(store => store.filter.query);
  const dispatch = useAppDispatch();

  const filterTodos = (fetchedTodos: Todo[]) => {
    let filteredTodos;

    if (selectedStatus === FilterStatus.All) {
      filteredTodos = fetchedTodos;
    } else if (selectedStatus === FilterStatus.Active) {
      filteredTodos = fetchedTodos.filter(todo => !todo.completed);
    } else if (selectedStatus === FilterStatus.Completed) {
      filteredTodos = fetchedTodos.filter(todo => todo.completed);
    }

    if (currentQuery) {
      filteredTodos = filteredTodos?.filter(todo =>
        todo.title.toLowerCase().includes(currentQuery.toLowerCase()),
      );
    }

    dispatch(setTodos(filteredTodos));
  };

  const fetchTodos = async () => {
    try {
      const todos = await getTodos();

      dispatch(setTodos(todos));
      filterTodos(todos);
      setLoader(false);
    } catch {
      setNoFetchedTodos(true);
      throw new Error('Error when loading todos');
    }
  };

  useEffect(() => {
    fetchTodos();

    if (currentTodo) {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [currentTodo, selectedStatus, currentQuery]);

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
              {loader && <Loader />}
              {noFetchedTodos && (
                <p className="notification is-warning">
                  There are no todos matching current filter criteria
                </p>
              )}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {modal && <TodoModal />}
    </>
  );
};
