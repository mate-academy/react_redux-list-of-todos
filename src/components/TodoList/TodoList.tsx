import classNames from 'classnames';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TODO_SELECTORS } from '../../store';
import { TODO_ACTIONS_CREATOR } from '../../store/currentTodoId';
import { Todo } from '../../types/Todo';

interface Props {
  filteredTodos: Todo[],
}

export const TodoList: FC<Props> = (props) => {
  const {
    filteredTodos,
  } = props;

  const dispatch = useDispatch();
  const currentTodoId = useSelector(TODO_SELECTORS.currentTodoId);

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
        {filteredTodos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames('', {
              'has-background-info-light': todo.id === currentTodoId,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed
              && (
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
                onClick={() => dispatch(TODO_ACTIONS_CREATOR.set(todo.id))}
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye': todo.id !== currentTodoId,
                    'fa-eye-slash': todo.id === currentTodoId,
                  })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
