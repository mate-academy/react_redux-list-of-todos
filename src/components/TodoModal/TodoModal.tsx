import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import cn from 'classnames';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { useAppDispatch } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

interface Props {
  currentTodo: Todo,
}

export const TodoModal: React.FC<Props> = ({ currentTodo }) => {
  const dispatch = useAppDispatch();
  const [todoOwner, setTodoOwner] = useState<User | null>(null);
  const { title, completed, id: todoId } = currentTodo;

  useEffect(() => {
    getUser(currentTodo.userId).then(setTodoOwner);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModalClosed = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!todoOwner ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handleModalClosed}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className={cn({
                'has-text-danger': !completed,
                'has-text-success': completed,
              })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${todoOwner.email}`}>
                {todoOwner.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
