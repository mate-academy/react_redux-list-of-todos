/* eslint-disable max-len */
import cn from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  todos: Todo[] | null;
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const setCurrentTodo = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));
  const removeCurrentTodo = () => dispatch(currentTodoActions.removeTodo());

  return (
    <>
      {!todos?.length
        ? (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )
        : (
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
                    <p className={cn(
                      {
                        'has-text-danger': !todo.completed,
                        'has-text-success': todo.completed,
                      },
                    )}
                    >
                      {todo.title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    {currentTodo?.id === todo.id
                      ? (
                        <button
                          data-cy="selectButton"
                          className="button"
                          type="button"
                          onClick={() => removeCurrentTodo()}
                        >
                          <span className="icon">
                            <i className="far fa-eye-slash" />
                          </span>
                        </button>
                      )
                      : (
                        <button
                          data-cy="selectButton"
                          className="button"
                          type="button"
                          onClick={() => setCurrentTodo(todo)}
                        >
                          <span className="icon">
                            <i className="far fa-eye" />
                          </span>
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
