import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelected } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { clearCurrentTodo } from '../../features/currentTodo';
import { useDispatch } from 'react-redux';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelected(state => state.currentTodo);
  const [loading, setLoadin] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setLoadin(true);
    if (!currentTodo) {
      return;
    }

    getUser(currentTodo.userId).then(userLoad => {
      setUser(userLoad);
      setLoadin(false);
    });
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={() => dispatch(clearCurrentTodo())}
      />

      {loading && <Loader />}

      {!loading && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(clearCurrentTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo.completed ? (
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
