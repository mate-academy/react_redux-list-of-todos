/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { actions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);

  const handleButton = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  }

  const searchTodo = todos.filter((todo) => {
    if (query !== '') {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    }

    return true;
  });

  const filteredTodos = searchTodo.filter((todo) => {
    if (status === 'all') {
      return true;
    }

    if (status === 'active') {
      return !todo.completed;
    }

    if (status === 'completed') {
      return todo.completed;
    }

    return true;
  });


  return (
    <>
      {!filteredTodos.length ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
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
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed ? (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  ) : null}
                </td>
                <td className="is-vcentered is-expanded">
                  <p className={classNames({
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
                  })}
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
                      handleButton(todo);
                    }}
                  >
                    <span className="icon">
                      <i className={currentTodo?.id === todo.id
                        ? 'far fa-eye-slash'
                        : 'far fa-eye'}
                      />
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
