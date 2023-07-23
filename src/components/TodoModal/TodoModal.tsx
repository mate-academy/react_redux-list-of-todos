import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { actions as actionsActive } from '../../features/activeTodo';
import { actions as actionsActiveUser } from '../../features/activeUser';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const activeTodo = useAppSelector(state => state.activeTodo);
  const user = useAppSelector(state => state.acitveUser);

  useEffect(() => {
    if (activeTodo) {
      getUser(activeTodo.userId)
        .then(userApi => dispatch(actionsActiveUser.addUser(userApi)));
    }
  }, [activeTodo]);

  const removeUser = () => {
    dispatch(actionsActiveUser.removeUser());
    dispatch(actionsActive.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user && <Loader />}

      {user && (
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
              {activeTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
