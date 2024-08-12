import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { todosReducer } from './features/todos';
import { StatusTypes } from './features/filter';

export const App = () => {
  const [isLoading, setisLoading] = useState(false);

  const status = useSelector<RootState>(
    state => state.filter.status,
  ) as StatusTypes;
  const query = useSelector<RootState>(state => state.filter.query) as string;
  const currentTodo = useSelector<RootState>(
    state => state.currentTodo,
  ) as Todo;
  const todos = useSelector<RootState>(state => state.todos) as Todo[];
  const dispatch = useDispatch();

  const loadTodos = (value: Todo[]) => dispatch(todosReducer(value));

  useEffect(() => {
    setisLoading(true);

    getTodos()
      .then(res => {
        loadTodos(res);
      })
      .finally(() => {
        setisLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredTodos = useMemo(() => {
    switch (status) {
      case StatusTypes.Active:
        return todos
          .flat()
          .filter(
            todo => !todo.completed && todo.title.toLowerCase().includes(query),
          );
      case StatusTypes.Completed:
        return todos
          .flat()
          .filter(
            todo => todo.completed && todo.title.toLowerCase().includes(query),
          );
      default:
        return todos
          .flat()
          .filter(todo => todo.title.toLowerCase().includes(query));
    }
  }, [query, status, todos]);

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

              {!!todos && !isLoading && <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
