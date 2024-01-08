/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);
  const [stringFilter, setStringFilter] = useState('');
  const [completedFilter, setCompletedFilter] = useState('all');
  const [modalId, setModalId] = useState<undefined | number>(undefined);

  const handleLoadTodos = () => {
    setLoader(true);
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .then(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    handleLoadTodos();
  }, []);

  const visibleTodos = () => {
    let visTodos = todos;

    if (stringFilter.length !== 0) {
      visTodos = todos.filter(todo => todo.title.includes(stringFilter));
    }

    if (completedFilter !== 'all') {
      if (completedFilter === 'completed') {
        visTodos = visTodos.filter(todo => todo.completed === true);
      }

      if (completedFilter === 'active') {
        visTodos = visTodos.filter(todo => todo.completed === false);
      }
    }

    return visTodos;
  };

  const modalTodo = todos.filter(todo => todo.id === modalId)[0];

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                stringFilter={stringFilter}
                setStringFilter={setStringFilter}
                completedFilter={completedFilter}
                setCompletedFilter={setCompletedFilter}
              />
            </div>

            <div className="block">
              {loader
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos()}
                    stringFilter={stringFilter}
                    modalId={modalId}
                    setModalId={setModalId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {modalId !== undefined && <TodoModal setModalId={setModalId} mainTodo={modalTodo} />}
      {/* <TodoModal setModalId={setModalId} mainTodo={modalTodo} /> */}
    </>
  );
};
