import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { resetCurrentTodo } from '../../features/currentTodo';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const userId = currentTodo?.userId;

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (userId) {
      getUser(userId)
        .then(user => setSelectedUser(user))
        .finally(() => setLoading(false));
    }

    return () => setLoading(true);
  }, [userId]);

  return (
    <>
      <div className="modal is-active" data-cy="modal">
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
                Todo #{currentTodo?.id}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(resetCurrentTodo())}
              />
            </header>
            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {currentTodo?.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}
                {' by '}
                <a href={`mailto:${selectedUser?.email}`}>
                  {selectedUser?.name}
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
