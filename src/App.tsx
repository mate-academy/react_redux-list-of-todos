import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';

import { useAppDispatch, useAppSelector } from './app/store';

export const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const todosFromRedux = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const visibleTodos = todosFromRedux.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    return matchesStatus && matchesQuery;
  });

  const filteredModalTodo =
    visibleTodos.find(todo => todo.id === selectedTodoId) || null;

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        dispatch(setTodos(todosFromServer));
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error fetching todos', error);
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          {loading && <Loader />}
          {!loading && (
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter />
              </div>

              <div className="block">
                <TodoList
                  data={visibleTodos}
                  onShowModal={setModal}
                  onSelectTodoId={setSelectedTodoId}
                  isModalOpen={modal}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {modal && filteredModalTodo && (
        <TodoModal
          switchMode={modal}
          onSwitch={setModal}
          selectedTodo={filteredModalTodo}
        />
      )}
    </>
  );
};
