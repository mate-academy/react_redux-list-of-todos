import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos } from './api';

import './App.scss';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';

import { useAppSelector } from './store';
import { actions as loadingActions } from './store/loadingReducer';
import { actions as todosActions } from './store/todosReducer';

export const App = () => {
  const dispatch = useDispatch();
  const { todosLoading } = useAppSelector(state => state.loading);
  const { choosenTodo } = useAppSelector(state => state.todos);

  const visibleTodos = useAppSelector(state => {
    const { query } = state.filter;
    const { completed } = state.filter;
    const { todos } = state.todos;

    return todos.filter(todo => {
      switch (completed) {
        case 'filter-active':
          return !todo.completed;

        case 'filter-completed':
          return todo.completed;

        default:
          return true;
      }
    }).filter(i => i.title.includes(query));
  });

  useEffect(() => {
    dispatch(loadingActions.startLoadingTodos());
    getTodos()
      .then(todosFromServer => {
        dispatch(todosActions.setTodos(todosFromServer));
      })
      .finally(() => dispatch(loadingActions.finishLoadingTodos()));
  }, []);

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
              {todosLoading && <Loader /> }

              {!todosLoading && visibleTodos.length > 0
                && (
                  <TodoList
                    todos={visibleTodos}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {choosenTodo && (
        <TodoModal choosenTodo={choosenTodo} />
      )}
    </>
  );
};
