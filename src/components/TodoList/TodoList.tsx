import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { Todo } from '../../types/Todo';
import { selectors } from '../../store';

type Props = {
  todos: Todo[],
  selectToDo: (todo: Todo | null) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectToDo,
}) => {
  const selectedTodo = useSelector(selectors.getTodo);

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
        {todos.map(todo => {
          const {
            id,
            title,
            completed,
          } = todo;

          const isSelected = selectedTodo?.id === id;

          return (
            <tr data-cy="todo" className="">
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={classNames({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
                })}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => selectToDo(todo)}
                >
                  <span className="icon">
                    <i
                      className={classNames(
                        'far',
                        {
                          'fa-eye': !isSelected,
                          'fa-eye-slash': isSelected,
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
  );
};
