import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import classNames from 'classnames';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { setClearCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    const loadUser = async () => {
      try {
        setLoading(true);
        setError(false);
        setUser(null);

        const fetchedUser = await getUser(currentTodo.userId);

        setUser(fetchedUser);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  return (
    <div
      className={classNames('modal', {
        'is-active': currentTodo,
      })}
      data-cy="modal"
    >
      <div
        className="modal-background"
        onClick={() => dispatch(setClearCurrentTodo())}
      />
      {loading && <Loader />}
      {!loading && error && (
        <p className="notification is-danger">Failed to load user</p>
      )}
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
            onClick={() => dispatch(setClearCurrentTodo())}
          />
        </header>

        {!error && !loading && user && (
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
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
