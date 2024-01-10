/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
// import { actions as modalActions } from './features/currentTodo';

export const App: React.FC = () => {
  //  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);
  const [stringFilter, setStringFilter] = useState('');
  const [completedFilter, setCompletedFilter] = useState('all');
  // const [modalId, setModalId] = useState<undefined | number>(undefined);

  const dispatch = useAppDispatch();
  const getTodosFromRedux = useAppSelector(state => state.todos);
  const getModal = useAppSelector(state => state.currentTodo);
  /* const setModal = (todo: Todo) => {
    dispatch(modalActions.setTodo(todo));
  }; */

  const handleLoadTodos = useCallback(() => {
    setLoader(true);
    getTodos()
      .then((todosFromServer:Todo[]) => {
        dispatch(todosActions.setTodos(todosFromServer));
        // setTodos(todosFromServer);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [dispatch]);

  useEffect(() => {
    handleLoadTodos();
  }, [handleLoadTodos]);

  const getfilter = useAppSelector(state => state.filter);

  const visibleTodos = () => {
    let visTodos = getTodosFromRedux;

    if (getfilter.query.length !== 0) {
      visTodos = visTodos.filter((todo:Todo) => todo.title.includes(stringFilter));
    }

    if (getfilter.filter === 'completed') {
      visTodos = visTodos.filter(todo => todo.completed === true);
    }

    if (getfilter.filter === 'active') {
      visTodos = visTodos.filter(todo => todo.completed === false);
    }

    return visTodos;
  };

  const modalTodo = getTodosFromRedux.filter(todo => todo.id === getModal?.id)[0];

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
                    // modalId={modalId}
                    // setModalId={setModalId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {getModal !== null && <TodoModal mainTodo={modalTodo}/* setModalId={setModalId} */ />}
      {/* <TodoModal setModalId={setModalId} mainTodo={modalTodo} /> */}
    </>
  );
};
