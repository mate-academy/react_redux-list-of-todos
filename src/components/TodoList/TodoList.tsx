/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { getTodos } from '../../api';
import { useAppSelector } from '../../app/hook';
import { useDispatch } from 'react-redux';
import { setTodos } from '../../features/todos';
import { Todo } from '../../types/Todo';
import { setCurrentTodo } from '../../features/currentTodo';
import { Loader } from '../Loader';

export const TodoList: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const todos = useAppSelector(state => state.todos);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const currentTodo = useAppSelector(state => state.currentTodo);

  // useEffect(() => {
  //   setLoading(true);
  //
  //   getTodos()
  //     .then(data => dispatch(setTodos(data)))
  //     .catch(() => {})
  //     .finally(() => setLoading(false));
  // }, [dispatch]);

  const filteredByStatusTodos = [...todos].filter((todo: Todo) => {
    switch (status) {
      case 'all':
        return todo;
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return todo;
    }
  });

  const filteredByQueryTodos = [...filteredByStatusTodos].filter((todo: Todo) =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      {filteredByQueryTodos.length <= 0 ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
        <>
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
              {filteredByQueryTodos.map((todo: Todo) => (
                <tr
                  data-cy="todo"
                  key={todo.id}
                  className={
                    currentTodo?.id === todo.id
                      ? 'has-background-info-light'
                      : ''
                  }
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
                      // className="has-text-danger"
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
                      onClick={() => {
                        dispatch(setCurrentTodo(todo));
                      }}
                    >
                      <span className="icon">
                        <i
                          className={
                            currentTodo?.id === todo.id
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
        </>
      )}
    </>
  );
};
