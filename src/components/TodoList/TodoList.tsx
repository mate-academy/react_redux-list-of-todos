/* eslint-disable max-len */
import { FC } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsCurrent } from '../../features/currentTodo';

type Props = {
  todos: Todo[];
  errorMessage: string;
};

export const TodoList: FC<Props> = ({ todos, errorMessage }) => {
  const dispatch = useAppDispatch();
  const selectTodo = useAppSelector(state => state.currentTodo);

  const handleClick = (todoId: number) => {
    const findTodo = todos.find(todo => todo.id === todoId);

    if (findTodo) {
      dispatch(actionsCurrent.setTodo(findTodo));
    }
  };

  return (
    <>
      {!todos && (
        <p className="notification is-warning">
          {!errorMessage ? 'There are no todos matching current filter criteria' : `${errorMessage}`}
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
          {todos.map(({
            id, title, completed,
          }) => {
            const selected = id === selectTodo?.id;

            return (
              <tr
                data-cy="todo"
                key={id}
                className={classNames(
                  { 'has-background-info-light': selected },
                )}
              >
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames(
                      { 'has-text-danger': !completed },
                      { 'has-text-success': completed },
                    )}
                  >
                    {title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleClick(id)}
                  >
                    <span className="icon">
                      <i
                        className={
                          selected ? 'far fa-eye-slash' : 'far fa-eye'
                        }
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
