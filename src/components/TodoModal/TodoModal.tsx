import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useAppSelector } from '../../app/hooks';

type Props = {
  userId: number,
  handleCloseModal: () => void,
};

export const TodoModal: React.FC<Props> = ({ userId, handleCloseModal }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId).then(res => setUser(res));
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user && currentTodo ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>

            <button
              aria-label="none"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{currentTodo.title}</p>

            <p className="block" data-cy="modal-user">
              {!currentTodo.completed
                ? (<strong className="has-text-danger">Planned</strong>)
                : (<strong className="has-text-success">Done</strong>)}

              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      ) : (<Loader />)}
    </div>
  );
};
