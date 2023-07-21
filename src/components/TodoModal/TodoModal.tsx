import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions as actionsActive } from '../../features/activeTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const activeTodo = useAppSelector(state => state.activeTodo);
  const [users, setUsers] = useState<User>();

  useEffect(() => {
    if (activeTodo) {
      getUser(activeTodo.userId)
        .then(user => setUsers(user));
    }
  }, []);

  const removeUser = () => {
    dispatch(actionsActive.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!users && <Loader />}

      {users && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${activeTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={removeUser}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{activeTodo?.title}</p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {activeTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${users.email}`}>{users.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
