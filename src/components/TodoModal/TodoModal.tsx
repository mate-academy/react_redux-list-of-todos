import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';

type Props = {
  userId: number,
  handleCloseModal?: () => void,
};

export const TodoModal: React.FC<Props> = ({
  userId,
  handleCloseModal,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setLoading(true);
    if (userId) {
      getUser(userId)
        .then(setUser)
        .finally(() => setLoading(false));
    }
  }, [userId]);

  return (
    <div
      className={classNames(
        'modal',
        {
          'is-active': currentTodo,
        },
      )}
      data-cy="modal"
    >
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {' '}
              {currentTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="Close"
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
