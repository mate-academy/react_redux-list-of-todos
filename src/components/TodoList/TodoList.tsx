import React from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();
  const { todo } = useAppSelector(state => state.currentTodo);

  const isSelected = (currentTodo: Todo) => {
    return currentTodo.id === todo?.id;
  };

  if (!todos?.length) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
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
          {todos.map(t => (
            <tr data-cy="todo" key={t.id}>
              <td className="is-vcentered">{t.id}</td>
              <td className="is-vcentered">
                {t.completed
                  && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={
                  t.completed ? 'has-text-success' : 'has-text-danger'
                }
                >
                  {t.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    dispatch(currentTodoActions.setTodo(t));
                  }}
                >
                  <span className="icon">
                    <i className={`far ${isSelected(t) ? 'fa-eye-slash' : 'fa-eye'}`} />
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
