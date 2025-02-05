/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearSelectedTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setIsLoading(true);

    getUser(selectedTodo.userId)
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
    }, [selectedTodo]);

    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${selectedTodo?.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(clearSelectedTodo())}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {selectedTodo?.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}
                {user ? (
                  <>
                    {' by '}
                    <a href={`mailto:${user.email}`}>{user.name}</a>
                  </>
                ) : (
                  ' (User data not available)'
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };
