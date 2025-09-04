import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from './hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { getTodos } from './api';
import { setTodos } from './features/todoSlice';
import { FilterField } from './types/Status';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const { todos } = useAppSelector(state => state.todos);
  const { query, filterField } = useAppSelector(state => state.filter);
  const { selectedTodo } = useAppSelector(state => state.selectedTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todosFromServer => {
        dispatch(setTodos(todosFromServer));
      })
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos;

    switch (filterField) {
      case FilterField.Active:
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case FilterField.Completed:
        filteredTodos = todos.filter(todo => todo.completed);
      default:
        break;
    }

    if (query.trim()) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filteredTodos;
  }, [todos, query, filterField, selectedTodo]);

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
              {loading ? <Loader /> : <TodoList todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
