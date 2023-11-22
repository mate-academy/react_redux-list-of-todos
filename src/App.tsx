import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions as TodoActions } from './features/todos';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);

  const todoSelected = useAppSelector(state => state.currentTodo);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(data => dispatch(TodoActions.setTodos(data)));
  }, []);

  useEffect(() => {
    setSelectedTodo(todoSelected);
  }, [todoSelected]);

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
              {todos.length === 0
                ? <Loader />
                : <TodoList todos={todos} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
