import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

import { getTodos } from './api';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos: Todo[] = useAppSelector(state => state.todos);
  const todo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then((data) => {
        dispatch(todosActions.getTodos(data));
      });
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {todos.length === 0 ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  <TodoList />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {todo && <TodoModal />}

    </>
  );
};
