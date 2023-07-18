/* eslint-disable max-len */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import { actions as todosActions } from '../../features/todos';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos: Todo[] = useAppSelector(state => state.todos);

  useEffect(() => {
    const fetchData = async () => {
      const data: Todo[] = await getTodos();

      dispatch(todosActions.setTodos(data));
    };

    fetchData();
  }, []);

  return (
    <>
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>

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
          {todos.map(todo => (
            <tr data-cy="todo" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p className={
                  classNames(
                    { 'has-text-danger': todo.completed === false },
                    { 'has-text-success': todo.completed === true },
                  )
                }
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button">
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
