import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as modalActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState<undefined | User>(undefined);

  const dispatch = useAppDispatch();
  const removeModal = () => {
    dispatch(modalActions.removeTodo());
  };

  const getModal = useAppSelector(state => state.currentTodo);

  const loadUser = useCallback(() => {
    getUser(getModal?.userId || 0)
      .then(userFromServer => {
        setUser(userFromServer);
      })
      .then(() => {
        setLoader(false);
      });
  }, [getModal]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loader
        ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${getModal?.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => removeModal()}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">{getModal?.title}</p>

              <p className="block" data-cy="modal-user">
                {/* For not completed */}
                {getModal?.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}
                {/* For completed */}

                {' by '}
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
