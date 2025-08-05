import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { clearTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    setIsLoading(true);

    getUser(currentTodo.userId)
      .then(setUser)
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{currentTodo?.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => {
              dispatch(clearTodo());
            }}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            fugiat veniam minus
          </p>

          <p className="block" data-cy="modal-user">
            {!currentTodo?.completed && (
              <strong className="has-text-danger">Planned</strong>
            )}

            {currentTodo?.completed && (
              <strong className="has-text-success">Done</strong>
            )}

            {' by '}
            <a href={`mailto:${user?.email}`}>{user?.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
