import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { setTodos } from './features/todos';
import { setQuery, setStatus } from './features/filter';
import { clearCurrentTodo, setCurrentTodo } from './features/currentTodo';

export const App = () => {
  const [modal, setModal] = useState(false);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => dispatch(setTodos(data)))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const closeModal = (todo?: Todo) => {
    setModal(prev => !prev);

    if (todo) {
      dispatch(setCurrentTodo(todo));
    } else {
      dispatch(clearCurrentTodo());
    }
  };

  const filteredTodos = todos.filter(todo => {
    const queryFilter = todo.title.toLowerCase().includes(query.toLowerCase());
    const optionFilter =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);

    return queryFilter && optionFilter;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={value => dispatch(setQuery(value))}
                option={status}
                setOption={value => dispatch(setStatus(value))}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {!isLoading && todos.length > 0 && (
                <TodoList
                  isLoading={isLoading}
                  selectedId={currentTodo?.id}
                  showModal={closeModal}
                  todos={filteredTodos}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modal && <TodoModal onClose={closeModal} selectedTodo={currentTodo} />}
    </>
  );
};
