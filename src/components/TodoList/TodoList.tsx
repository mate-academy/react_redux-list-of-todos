/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

type Props = {
  filteredTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ filteredTodos }) => {
  const todo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const handleChooseTodo = (value: Todo) => {
    dispatch(currentTodoSlice.actions.setCurrentTodo(value));
  };

  console.log(todo);

  return (
    <>
      {filteredTodos.length === 0 ? (
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
            {filteredTodos.map(todoList => (
              <tr data-cy="todo" key={todoList.id}>
                <td className="is-vcentered">{todoList.id}</td>
                <td className="is-vcentered">
                  {todoList.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames({
                      'has-text-success': todoList.completed,
                      'has-text-danger': !todoList.completed,
                    })}
                  >
                    {todoList.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleChooseTodo(todoList)}
                  >
                    {todo && todo.id === todoList.id ? (
                      <span className="icon">
                        <i className="far fa-eye-slash" />
                      </span>
                    ) : (
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    )}
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
