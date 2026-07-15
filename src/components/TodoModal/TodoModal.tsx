import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearTodo } from '../../features/currentTodo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import classNames from 'classnames';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const [modalLoading, setModalLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    setModalLoading(true);
    getUser(currentTodo.userId)
    .then(setUser)
    .finally(() => setModalLoading(false));
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }
  const isCompleted = currentTodo.completed;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {modalLoading ? (
        <Loader />
      )
        : (
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
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(clearTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames(
                  isCompleted ? 'has-text-success' : 'has-text-danger',
                )}
              >
                {isCompleted ? 'Done' : 'Planned'}
                </strong>

                {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
        )}
    </div>
  );
};
