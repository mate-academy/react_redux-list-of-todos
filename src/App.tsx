import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { todosActions } from './features/todos';
import { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import { currentTodoActions } from './features/currentTodo';
import useAppSelector from './hooks/useAppSelector';
import { StatusType } from './types/Status';

export const App = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const { set: setTodos } = todosActions;

  const filter = useAppSelector(state => state.filter);

  const currentTodo = useAppSelector(state => state.currentTodo);
  const { clear: clearCurrentTodo } = currentTodoActions;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const closeModal = () => {
    dispatch(clearCurrentTodo());
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(res => dispatch(setTodos(res)))
      .catch(err => setErrorMessage(err.message))
      .finally(() => setIsLoading(false));
  }, [dispatch, setTodos]);

  const filteredByStatusTodos = useMemo(() => {
    switch (filter.status) {
      case StatusType.ALL:
        return todos;
      case StatusType.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case StatusType.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter.status]);

  const filteredByQueryTodos = useMemo(() => {
    const query = filter.query.toLowerCase().trim();

    return filteredByStatusTodos.filter(todo => {
      return todo.title.toLowerCase().includes(query);
    });
  }, [filteredByStatusTodos, filter.query]);

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
              {isLoading && <Loader />}
              {!!errorMessage && (
                <div className="notification is-danger">{errorMessage}</div>
              )}
              {todos.length > 0 && <TodoList todos={filteredByQueryTodos} />}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal todo={currentTodo} onClose={closeModal} />}
    </>
  );
};
