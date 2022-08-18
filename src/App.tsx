/* HOOKS */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
/* API, , STORE and TYPES */
import { selectors, actions } from './store';
import { getTodos } from './api';
import { Todo } from './types/Todo';
/* COMPONENTS */
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
/* STYLES */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const App = () => {
  /* STATES */
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [certainTypeTodos, setCertainTypeTodos] = useState('all');

  /* REDUX HOOKS */
  const loading = useSelector(selectors.getLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.loadingActions.startLoading());

    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .finally(() => dispatch(actions.loadingActions.finishLoading()));
  }, []);

  /* FUNCTIONS */
  const handlSelectedTodos = (event: { target: { value: string; }; }) => {
    setCertainTypeTodos(event.target.value);
  };

  const handleSetQuery = (event: { target: { value: string; }; }) => {
    setQuery(event.target.value.toLowerCase());
  };

  const handleUserIdBtn = (userIdFromTodo: number) => {
    setTodoId(userIdFromTodo);
  };

  const selectedBy = todos.filter((todo: Todo) => {
    switch (certainTypeTodos) {
      case 'all':
        return todo;
      case 'active':
        return todo.completed === false;
      case 'completed':
        return todo.completed === true;
      default:
        return todo;
    }
  });

  const visibleTodos = selectedBy.filter((todo) => {
    return todo.title.toLowerCase().includes(query);
  });

  const resetQuery = () => {
    setQuery('');
  };

  const resetTodoId = () => {
    setTodoId(0);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectEl={certainTypeTodos}
                onSelectedTodos={handlSelectedTodos}
                query={query}
                onResetQuery={resetQuery}
                onFilter={handleSetQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onResetTodoId={resetTodoId}
                  selectTodoId={todoId}
                  onSelectTodo={handleUserIdBtn}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
