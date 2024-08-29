import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useMemo } from 'react';
import { Status } from './types/Status';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as todosActions from './features/todos';

export const App = () => {
  const { todos, loading } = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(todosActions.init());
  }, []);

  const filteredList = useMemo(() => {
    const filteredByQuery = todos.filter(todo =>
      todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );

    switch (status) {
      case Status.active:
        return filteredByQuery.filter(todo => !todo.completed);
      case Status.completed:
        return filteredByQuery.filter(todo => todo.completed);
      default:
        return filteredByQuery;
    }
  }, [query, todos, status]);

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
                todos.length > 0 && <TodoList filteredList={filteredList} />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
