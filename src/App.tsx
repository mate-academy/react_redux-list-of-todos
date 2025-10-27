import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useEffect } from 'react';
import { useAppSelector } from './app/hooks';

import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { setTodos, startLoading } from './features/todos';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { loading } = useAppSelector(state => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading());

    const getAllTodos = async () => {
      const todosList: Todo[] = await getTodos();

      dispatch(setTodos(todosList));
    };

    getAllTodos();
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">{loading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
