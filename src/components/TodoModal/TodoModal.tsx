import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hook';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { clearTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);
    if (typeof currentTodo?.userId === 'number') {
      getUser(currentTodo?.userId)
        .then(db => setUser(db))
        .finally(() => setLoading(false));
    }
  }, []);

  const hndaleClearCurrentTask = () => {
    dispatch(clearTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && <Loader />}

      {!loading && (
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
              onClick={hndaleClearCurrentTask}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!currentTodo?.completed ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}

              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
