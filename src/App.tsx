import React, {
  useEffect, useMemo,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Status } from './types/Status';
import { actions as todoActions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const setTodos = (todos: Todo[]) => dispatch(todoActions.setTodos(todos));
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const todos = useAppSelector(state => state.todos);

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const visibleTodos = todos
    .filter(todo => todo.title.toLocaleLowerCase()
      .includes(query.toLocaleLowerCase().trim()));

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Status.completed:
        return visibleTodos.filter(todo => todo.completed);

      case Status.active:
        return visibleTodos.filter(todo => !todo.completed);

      default:
        return visibleTodos;
    }
  }, [todos, query, filter]);

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
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={filteredTodos}
              />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
