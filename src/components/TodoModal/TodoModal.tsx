import { FC, useEffect, useState } from 'react';

import { User } from '../../types/User';

import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearCurrentTodo,
  selectCurrentTodo,
} from '../../features/currentTodo';

import { Loader } from '../Loader';

export const TodoModal: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<null | User>(null);
  const currentTodo = useAppSelector(selectCurrentTodo);
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(clearCurrentTodo());
  };

  useEffect(() => {
    setIsLoading(true);

    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(setUser)
        .finally(() => {
          setIsLoading(false);
        });
    }
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
            onClick={handleCloseModal}
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
            <a href={`mailto:${user?.email}`}>{user?.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
