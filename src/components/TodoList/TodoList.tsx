import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';
import { actions as CurrentTodoActions } from '../../features/currentTodo';

type Props = {
  todos: Todo[];
  changeUserId(todoId: number | null): void,
};

export const TodoList: React.FC<Props> = (
  {
    todos,
    changeUserId,
  },
) => {
  const dispatch = useDispatch();

  const currentTodo = useAppSelector(state => state.currentTodo);
  const setCurrentTodo = (
    value: Todo,
  ) => dispatch(CurrentTodoActions.setTodo(value));

  const changeTodo = (todoId: number) => {
    setCurrentTodo(todos.find(todo => todo.id === todoId) as Todo);
  };

  return (
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
        <>
          {todos.map(todo => (
            <tr
              data-cy="todo"
              className={classNames(
                { 'has-background-info-light': currentTodo?.id === todo.id },
              )}
              key={todo.title}
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
                <p className={classNames(
                  { 'has-text-success': todo.completed },
                  { 'has-text-danger': !todo.completed },
                )}
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
                    changeTodo(todo.id);
                    changeUserId(todo.userId);
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('far', {
                        'fa-eye-slash': currentTodo?.id === todo.id,
                        'fa-eye': currentTodo?.id !== todo.id,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </>

      </tbody>
    </table>
  );
};
