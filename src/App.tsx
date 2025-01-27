import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { getAllTodo } from './services/allTodo';
import { getCompletedTodo } from './services/completedTodo';
import { getActiveTodo } from './services/activeTodo';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { useAppSelector } from './app/hooks';
import { useDispatch } from 'react-redux';
import { actions as currentTodoActions } from './features/currentTodo';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const filter = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);

  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const filteredTodos = useMemo(() => {
    return [...todos].filter(todo =>
      todo.title.toLowerCase().includes(filter.query.toLowerCase()),
    );
  }, [todos, filter.query]);

  useEffect(() => {
    setLoading(true);

    if (filter.status === 'all') {
      getAllTodo()
        .then(res => dispatch(todosActions.todos(res)))
        .finally(() => setLoading(false));
    } else if (filter.status === 'active') {
      getActiveTodo()
        .then(res => dispatch(todosActions.todos(res)))
        .finally(() => setLoading(false));
    } else if (filter.status === 'completed') {
      getCompletedTodo()
        .then(res => dispatch(todosActions.todos(res)))
        .finally(() => setLoading(false));
    }
  }, [filter.status]);

  function handleCloseButton() {
    dispatch(currentTodoActions.selectTodo(null));
  }

  function handleSelectedTodo(todo: Todo) {
    dispatch(currentTodoActions.selectTodo(todo));
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>
            {loading && <Loader />}

            <div className="block">
              {!loading && todos.length > 0 && (
                <TodoList
                  filteredTodos={filteredTodos}
                  handleSelectedTodo={handleSelectedTodo}
                />
              )}
            </div>
            {currentTodo && <TodoModal handleCloseButton={handleCloseButton} />}
          </div>
        </div>
      </div>
    </>
  );
};
