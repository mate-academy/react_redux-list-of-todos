/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';

import { setOpen } from '../../features/currentTodo';
import { Loader } from '../Loader';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useAppSelector(state => state.todos);
  const todos = useAppSelector(state => state.todos.items);
  const filter = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const selectedTodo = useAppSelector(state => state.currentTodo.todo);

  const visibleTodos = todos.filter(todo => {
    const statusMatches =
      filter === 'all' ||
      (filter === 'active' ? !todo.completed : todo.completed);
    const queryMatches = todo.title.toLowerCase().includes(query.toLowerCase());
    return statusMatches && queryMatches;
  });

  if (!isLoading && visibleTodos.length === 0 && query) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria{' '}
      </p>
    );
  }

  return (
    <>
      <div className="block">
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <table className="table is-narrow is-fullwidth">
            <thead>
              <tr>
                <th>#</th>
                <th>
                  <span className="icon">
                    <i className="fas fa-check" />
                  </span>
                </th>
                <th>Title</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {visibleTodos.map(todo => (
                <tr
                  key={todo.id}
                  data-cy="todo"
                  className={todo.completed ? 'has-background-info-light' : ''}
                >
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered">
                    {todo.completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>
                  <td className="is-vcentered is-expanded">
                    <p
                      className={
                        todo.completed ? 'has-text-success' : 'has-text-danger'
                      }
                    >
                      {todo.title}
                    </p>
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch(setOpen(todo))}
                    >
                      <span className="icon">
                        <i
                          className={
                            selectedTodo?.id === todo.id
                              ? 'far fa-eye-slash'
                              : 'far fa-eye'
                          }
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
