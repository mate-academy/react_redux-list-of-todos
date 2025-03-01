import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';

type Props = {
  todos: Todo[] | null;
};

export const setCompletedClass = (isCompleted: boolean | undefined) => {
  return classNames([isCompleted ? 'has-text-success' : 'has-text-danger']);
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const selectedTodo = useAppSelector(state => state.currentTodo.todo);
  const dispatch = useAppDispatch();

  const setSelectedClass = (todoId: number) => {
    return classNames('far', [
      selectedTodo?.id === todoId ? 'fa-eye-slash' : 'fa-eye',
    ]);
  };

  const handleModal = (todo: Todo, userId: number) => {
    dispatch(setCurrentTodo({ todo, userId }));
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
        {todos?.map(todo => {
          const { id, title, completed, userId } = todo;

          return (
            <tr
              data-cy="todo"
              className={
                selectedTodo?.id === id ? 'has-background-info-light' : ''
              }
              key={id}
            >
              <td className="is-vcentered">{id}</td>
              {completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>{' '}
                </td>
              ) : (
                <td className="is-vcentered" />
              )}
              <td className="is-vcentered is-expanded">
                <p className={setCompletedClass(completed)}>{title}</p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleModal(todo, userId)}
                >
                  <span className="icon">
                    <i className={setSelectedClass(id)} />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
