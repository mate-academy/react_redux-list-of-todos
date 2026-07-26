/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks/dispatchHook';
import { Todo } from '../../types/Todo';
import { currentTodoSlice } from '../../features/currentTodo';
import { Loader } from '../Loader';

type Props = {
  loading: boolean;
};

export const TodoList: React.FC<Props> = ({ loading }) => {
  const todos = useAppSelector(state => state.todos);

  const { query, status } = useAppSelector(state => state.filter);

  const currentTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  function visibleTodos(query :string, status : string, todos :Todo[]) {
    let result = [...todos];

    if (query) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    switch (status) {
      case 'active':
        result = result.filter(todo => !todo.completed);
        break;
      case 'completed':
        result = result.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    return result
  }

  const resTodo = visibleTodos(query, status, todos)

  return (
    <>
      {loading && <Loader />}
      {resTodo.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {resTodo.length > 0 && (
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
            {resTodo.map(todo => (
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button data-cy="selectButton" className="button" type="button" onClick={() => dispatch(currentTodoSlice.actions.setCurrentTodo(todo))}>
                    <span className="icon">
                      <i className={todo.id === currentTodo?.id ? 'far fa-eye-slash' : 'far fa-eye'} />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </>
  );
};
