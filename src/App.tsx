import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { Status } from './types/Status';

export const App = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const filterData = useSelector((state: RootState) => state.filter);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  function getVisibleTodos(
    allTodos: Todo[],
    {
      query,
      status,
    }: {
      query: string;
      status: Status;
    },
  ) {
    let handledTodos = allTodos;

    if (query) {
      handledTodos = handledTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    switch (status) {
      case 'active':
        handledTodos = handledTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        handledTodos = handledTodos.filter(todo => todo.completed);
        break;
      default:
        return handledTodos;
    }

    return handledTodos;
  }

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => {
        throw Error('Something went wrong with Todos loading');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visibleTodoList = todos ? getVisibleTodos(todos, filterData) : [];

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
              {todos && <TodoList todoList={visibleTodoList} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
