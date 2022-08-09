/* HOOKS */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
/* API, , STORE and TYPES */
import { actions, selectors } from './store';
import { getTodos } from './api';
import { Todo } from './types/Todo';
/* COMPONENTS */
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
/* STYLES */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

export const App = () => {
  /* STATES */
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [certainTypeTodos, setCertainTypeTodos] = useState('all');

  /* REDUX HOOKS */
  const loading = useSelector(selectors.selectorsLoading.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    getTodos().then(todosFromServer => setTodos(todosFromServer));

    dispatch(actions.loadingActions.startLoading());

    if (todos) {
      const action = actions.loadingActions.finishLoading();

      /* Added so we can see the Loader */
      setTimeout(() => dispatch(action), 1000);
    }
  }, []);

  /* FUNCTIONS */
  const handlSelectedTodos = async (event: { target: { value: string; }; }) => {
    setCertainTypeTodos(event.target.value);
  };

  const handleSetQuery = async (event: { target: { value: string; }; }) => {
    setQuery(event.target.value.toLowerCase());
  };

  const handleUserIdBtn = async (userIdFromTodo: number) => {
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

  const resetQuery = async () => {
    setQuery('');
  };

  const resetTodoId = async () => {
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
                selectedTodos={handlSelectedTodos}
                query={query}
                resetQuery={resetQuery}
                filter={handleSetQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  resetTodoId={resetTodoId}
                  selectTodoId={todoId}
                  selectTodo={handleUserIdBtn}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
