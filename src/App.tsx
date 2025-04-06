import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { Todo } from './types/Todo';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { setCurrentTodo } from './features/currentTodo';
import { setTodos } from './features/todos';

function getFilteredTodos(todos: Todo[], query: string, queryInput: string) {
  const lowerCaseQueryInput = queryInput.toLowerCase();
  let preparedTodos = todos;

  if (query === 'active') {
    preparedTodos = todos.filter(todo => !todo.completed);
  } else if (query === 'completed') {
    preparedTodos = todos.filter(todo => todo.completed);
  }

  let readyTodos;

  if (queryInput !== '') {
    readyTodos = preparedTodos.filter(readyTodo =>
      readyTodo.title.toLowerCase().includes(lowerCaseQueryInput),
    );

    return readyTodos;
  }

  return preparedTodos;
}

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [clickedTodos, setClickedTodos] = useState<number[]>([]);

  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const checkedTodo = useSelector((state: RootState) => state.currentTodo);

  const { query, status } = useSelector((state: RootState) => state.filter);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(fetchedTodos => {
        dispatch(setTodos(fetchedTodos));
      })
      .finally(() => setLoading(false));
  }, []);

  const isTodoClicked = (todoId: number) => {
    return clickedTodos.includes(todoId);
  };

  const toggleTodoClicked = (todoId: number) => {
    if (isTodoClicked(todoId)) {
      setClickedTodos(prev => prev.filter(id => id !== todoId));
    } else {
      setClickedTodos(prev => [...prev, todoId]);
    }
  };

  const resetTodoClickedState = () => {
    setClickedTodos([]);
  };

  const visibleTodos = getFilteredTodos(todos, status, query);

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
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  checkedTodo={todo => {
                    dispatch(setCurrentTodo(todo));
                  }}
                  isTodoClicked={isTodoClicked}
                  toggleTodoClicked={toggleTodoClicked}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {checkedTodo !== null && (
        <TodoModal resetTodoClickedState={resetTodoClickedState} />
      )}
    </>
  );
};
