import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  closeModal: () => void;
};

export const TodoModal: React.FC<Props> = ({
  closeModal,
}: Props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setLoading(true);

    getUser(currentTodo?.userId || 0)
      .then(foundUser => {
        setUser(foundUser);
        setLoading(false);
      });
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loading
        ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${currentTodo?.id}`}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                aria-label="close"
                onClick={closeModal}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {currentTodo?.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

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
