import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks/hooks';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentTodo?.userId) {
      getUser(currentTodo.userId)
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }
  }, [currentTodo?.userId]);

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
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(currentTodoSlice.actions.clear())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  currentTodo?.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {currentTodo?.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
