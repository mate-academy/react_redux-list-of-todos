import classNames from 'classnames';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsCurrTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const setCurrentTodo = (todo: Todo) => {
    dispatch(actionsCurrTodo.setTodo(todo));
  };

  return (
    <>
      {todos.length === 0
        ? (
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
              {todos.map(todo => {
                const {
                  id,
                  completed,
                  title,
                } = todo;

                return (
                  <tr data-cy="todo" key={id}>
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
                        className={completed
                          ? 'has-text-success'
                          : 'has-text-danger'}
                      >
                        {title}
                      </p>
                    </td>

                    <td className="has-text-right is-vcentered">
                      <button
                        data-cy="selectButton"
                        className="button"
                        type="button"
                        onClick={() => setCurrentTodo(todo)}
                      >
                        <span className="icon">
                          <i
                            className={classNames(
                              'far',
                              {
                                'fa-eye-slash': todo === currentTodo,
                                'fa-eye': todo !== currentTodo,
                              },
                            )}
                          />
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
    </>
  );
};
