/* eslint-disable max-len */
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';
import { RootState } from '../../app/store';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = (props) => {
  const { todos } = props;
  const { setTodo } = actions;
  const dispatch = useDispatch();

  const selectCurrentTodo = (state: RootState) => state.currentTodo;

  const currentTodo = useSelector(selectCurrentTodo);

  return (
    <>
      { todos.length < 1 && (
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
          {todos.map(todo => (
            <tr
              data-cy="todo"
              className=""
              key={todo.id}
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
                  className={todo.completed
                    ? 'has-text-success'
                    : 'has-text-danger'}
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
                    dispatch(setTodo(todo));
                  }}
                >
                  <span className="icon">
                    <i className={currentTodo?.id !== todo.id
                      ? 'far fa-eye'
                      : 'far fa-eye-slash'}
                    />
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
