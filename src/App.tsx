import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/hooks';
import { actions } from './features/todos';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { todos } = useAppSelector(state => state.todos);
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query } = useAppSelector(state => state.filter);
  const showNotification = visibleTodos.length === 0 && query.length > 0;

  const filter = useAppSelector(state => state.filter);

  useEffect(() => {
    setIsShowLoader(true);
    getTodos()
      .then(response => {
        dispatch(actions.setTodos(response));
      })
      .finally(() => setIsShowLoader(false));
  }, [dispatch]);

  useEffect(() => {
    if (todos) {
      setVisibleTodos(todos);
    }
  }, [todos]);

  useEffect(() => {
    if (!todos) return;
      let copy: Todo[] = [...todos];

      if (filter.query.length > 0) {
        copy = copy.filter(elem =>
          elem.title
            .toLocaleLowerCase()
            .includes(filter.query.toLocaleLowerCase()),
        );
      }

      if (filter.status === 'completed') {
        copy = copy.filter(elem => elem.completed === true);
      }

      if (filter.status === 'active') {
        copy = copy.filter(elem => elem.completed === false);
      }

      setVisibleTodos(copy);

  }, [filter, todos]);

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

              {currentTodo && <TodoModal todo={currentTodo} />}

              {isShowLoader && <Loader />}

              {showNotification && (

                <p className="notification is-warning">
                  There are no todos matching current filter criteria
                </p>

              )}

              {visibleTodos.length > 0 && <TodoList todoList={visibleTodos} />}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
