import { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../services/api';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(setUser)
        .finally(() => setLoading(false));
    }
  }, [currentTodo]);

  const handleCloseModal = () => dispatch(currentTodoSlice.actions.clear());

  return (
    <>
      {currentTodo && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" onClick={handleCloseModal} />

          {loading ? (
            <Loader />
          ) : (
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

                  {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
