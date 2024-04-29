import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const todo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<null | User>(null);
  const resetUser = () => {
    dispatch(actions.removeTodo());
    setUser(null);
  };

  useEffect(() => {
    if (todo?.userId) {
      getUser(todo?.userId).then(response => {
        setUser(response as User);
      });
    }
  }, [todo?.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {user ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={resetUser}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {/* For completed */}

              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
