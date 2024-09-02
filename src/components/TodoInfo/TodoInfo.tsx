import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useState } from 'react';
import { TodoModal } from '../TodoModal';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const [isInfoShown, setIsInfoShown] = useState(false);

  return (
    <>
      <tr data-cy="todo" className="">
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
            className={todo.completed ? 'has-text-success' : 'has-text-danger'}
          >
            {todo.title};
          </p>
        </td>
        <td className="has-text-right is-vcentered">
          <button
            data-cy="selectButton"
            className="button"
            type="button"
            onClick={() => setIsInfoShown(true)}
          >
            <span className="icon">
              <i
                className={classNames('far', {
                  'fa-eye': !isInfoShown,
                  'fa-eye-slash': isInfoShown,
                })}
              />
            </span>
          </button>
        </td>
      </tr>

      {isInfoShown && <TodoModal closeFunction={setIsInfoShown} todo={todo} />}
    </>
  );
};
