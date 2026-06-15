import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { actions as actionsCurrentTodo } from '../../features/currentTodo';
import { useDispatch } from 'react-redux';

type Status =
  | { type: 'success'; user: User }
  | { type: 'loading' }
  | { type: 'error'; error: string };

export const TodoModal = ({ currentTodo }: { currentTodo: Todo }) => {
  const [status, setStatus] = useState<Status>({ type: 'loading' });
  const dispatch = useDispatch();

  useEffect(() => {
    getUser(currentTodo.userId)
      .then(user => {
        setStatus({ type: 'success', user });
      })
      .catch((error: Error) => {
        setStatus({ type: 'error', error: error.message });
      });
  }, [currentTodo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {status.type === 'loading' && <Loader />}
      {status.type === 'success' && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => dispatch(actionsCurrentTodo.clearTodo())}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!currentTodo.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {currentTodo.completed && (
                <strong className="has-text-success">Done</strong>
              )}

              {' by '}
              <a href={`mailto:${status.user.email}`}>{status.user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
