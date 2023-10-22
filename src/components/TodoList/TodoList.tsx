/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filterParams = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  const setCurrentTodo = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  const { query, status } = filterParams;

  const filteredTodos = useMemo(() => {
    let newTodos = [...todos];

    if (query) {
      newTodos = newTodos.filter(
        todo => todo.title.toLowerCase().includes(query),
      );
    }

    switch (status) {
      case 'active':
        return newTodos.filter(todo => !todo.completed);

      case 'completed':
        return newTodos.filter(todo => todo.completed);

      default:
        return newTodos;
    }
  }, [status, query]);

  return (
    <>
      {!filteredTodos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {filteredTodos.map(todo => (
            <tr data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p className={!todo.completed ? 'has-text-danger' : 'has-text-success'}>{todo.title}</p>
              </td>

              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button" onClick={() => setCurrentTodo(todo)}>
                  <span className="icon">
                    {currentTodo?.id === todo.id ? <i className="far fa-eye-slash" /> : <i className="far fa-eye" />}
                  </span>
                </button>
              </td>
            </tr>
          ))}

          {/* <tr data-cy="todo" className="has-background-info-light">
            <td className="is-vcentered">3</td>
            <td className="is-vcentered"> </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">fugiat veniam minus</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye-slash" />
                </span>
              </button>
            </td>
          </tr> */}

        </tbody>
      </table>
    </>
  );
};
