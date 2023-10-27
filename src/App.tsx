/* eslint-disable max-len */
import React, {
  useMemo,
  useEffect,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './getTodos';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as actionsTodos } from './features/todos';
import { actions as actionsFilter } from './features/filter';
import { actions as actionsTodo } from './features/currentTodo';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const chosenTodo = useAppSelector(state => state.currentTodo);
  const setChosenTodo = (todo: Todo) => dispatch(actionsTodo.setTodo(todo));
  const setFilterQuery = (value: string) => dispatch(actionsFilter.changeQuery(value));
  const setFilterStatus = (value: string) => dispatch(actionsFilter.changeStatus(value));
  const clearTodo = () => dispatch(actionsTodo.removeTodo());

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((data) => dispatch(actionsTodos.setTodos(data)))
      .catch((e) => setErrorMessage(e.message))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    const filteredByTodos = todos.length ? todos.filter((todo) => {
      const { completed } = todo;
      const { status } = filter;

      switch (status) {
        case 'all':
          return true;
        case 'active':
          return !completed;
        case 'completed':
          return completed;
        default:
          return true;
      }
    })
      : [];

    const { query } = filter;

    const filteredByQueryTodos = query
      ? filteredByTodos.filter((todo) => todo.title
        .toLowerCase().includes(query.toLowerCase())) : filteredByTodos;

    return filteredByQueryTodos;
  }, [filter.status, filter.query, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilterQuery={setFilterQuery}
                setFilterStatus={setFilterStatus}
              />
            </div>
            {isLoading && !errorMessage && <Loader />}

            {!isLoading && (
              <div className="block">
                <TodoList
                  chosenTodo={chosenTodo}
                  setIsModalLoading={setIsModalLoading}
                  todos={filteredTodos}
                  setChosenTodo={setChosenTodo}
                />
              </div>
            )}

            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </div>
      </div>

      {!!chosenTodo
      && (<TodoModal clearTodo={clearTodo} isLoading={isModalLoading} setIsLoading={setIsModalLoading} todo={chosenTodo} />)}
    </>
  );
};
