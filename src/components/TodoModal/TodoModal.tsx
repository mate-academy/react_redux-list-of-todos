import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import classNames from 'classnames';
import { actions as currentActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentTodo } = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId).then(setUser);
    }
  }, [currentTodo]);

  const handleUnsetTodo = () => {
    dispatch(currentActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {user === null ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleUnsetTodo}
              aria-label="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-danger': !currentTodo?.completed,
                  'has-text-success': currentTodo?.completed,
                })}
              >
                {currentTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
