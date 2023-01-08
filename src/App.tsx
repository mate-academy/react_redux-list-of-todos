import { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';

import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState<number | null>(null);
  const [status, setStatus] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      setTodos(await getTodos());
    };

    fetchTodos();
  }, []);

  const compareInput = (
    title: string,
    inputValue: string,
  ) => title.includes(inputValue.toLowerCase());

  const visibleTodos = useMemo(() => {
    return todos.filter(({ completed, title }) => {
      switch (status) {
        case 'active':
          return !completed && compareInput(title, input);

        case 'completed':
          return completed && compareInput(title, input);

        default:
          return compareInput(title, input);
      }
    });
  }, [todos, status, input]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                setStatus={setStatus}
                input={input}
                setInput={setInput}
              />
            </div>

            <div className="block">
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={todoId}
                  selectTodo={setTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todoId
        && (
          <TodoModal
            todos={visibleTodos}
            selectedTodoId={todoId}
            selectTodo={setTodoId}
          />
        )}
    </>
  );
};
