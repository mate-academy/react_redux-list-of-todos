import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearCurrentTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedTodo) {
      setIsLoading(true);
      getUser(selectedTodo.userId)
        .then(setUser)
        .finally(() => setIsLoading(false));
    }
  }, [selectedTodo]);

  if (!selectedTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={() => dispatch(clearCurrentTodo())}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(clearCurrentTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            {user && (
              <p className="block" data-cy="modal-user">
                {/* For not completed */}
                <strong
                  className={
                    selectedTodo.completed
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
                >
                  {selectedTodo.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}
                <a href={`mailto:${user?.email}`}>{user.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
