import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/Hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useDispatch } from 'react-redux';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = React.useState<User>();
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    setLoading(true);
    getUser(currentTodo.userId)
      .then(data => setUser(data))
      .finally(() => setLoading(false));
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && <Loader />}

      {!loading && user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {'Todo #' + currentTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() =>
                dispatch({ type: 'currentTodo/setCurrentTodo', payload: null })
              }
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
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
      )}
    </div>
  );
};
