import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { FilterStatus } from './features/filter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { setTodos } from './features/todos';

export const App = () => {
  const filterSelector = useSelector((state: RootState) => state.filter.status);
  const inputFilter = useSelector((state: RootState) => state.filter.query);
  const todos = useSelector((state: RootState) => state.todos);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getTodos().then(data => dispatch(setTodos(data)));
  }, [dispatch]);

  const filterTodos = (data: Todo[], filter: FilterStatus, query = '') => {
    const lowerQuery = query.toLocaleLowerCase();

    switch (filter) {
      case 'all': {
        return [...data].filter(todo =>
          todo.title.toLocaleLowerCase().includes(lowerQuery),
        );
      }

      case 'active': {
        return [...data]
          .filter(todo => !todo.completed)
          .filter(todo => todo.title.toLocaleLowerCase().includes(lowerQuery));
      }

      case 'completed': {
        return [...data]
          .filter(todo => todo.completed)
          .filter(todo => todo.title.toLocaleLowerCase().includes(lowerQuery));
      }
    }
  };

  const filteredTodos = filterTodos(todos, filterSelector, inputFilter);

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
              {!todos.length ? <Loader /> : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal currentTodo={currentTodo} />}
    </>
  );
};
