import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoList } from './components/TodoList/TodoList';
import { TodoModal } from './components/TodoModal/TodoModal';
import { Loader } from './components/Loader/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getTodos()
      .then((todos: Todo[]) => {
        dispatch(setTodos(todos));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Todos</h1>

        <div className="box">
          <TodoFilter />
          {loading ? <Loader /> : <TodoList />}
        </div>

        {currentTodo && <TodoModal />}
      </div>
    </div>
  );
};
