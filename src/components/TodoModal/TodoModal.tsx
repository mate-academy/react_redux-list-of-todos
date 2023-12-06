import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const selectedTodos = useAppSelector((state) => state.currentTodo);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedTodos && selectedTodos.userId !== undefined) {
      getUser(selectedTodos.userId)
        .then((userData) => {
          setUser(userData);
          setLoading(false);
        }).catch(() => {
          throw new Error('error modal');
        });
    } else {
      setLoading(false);
    }
  }, [selectedTodos]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {selectedTodos?.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="close-button"
              onClick={() => dispatch(actions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodos?.title}
            </p>

            {user && (
              <div>
                <p className="block" data-cy="modal-user">
                  {
                    selectedTodos?.completed
                && <strong className="has-text-success">Done</strong>
                  }
                  {
                    !selectedTodos?.completed
                && <strong className="has-text-danger">Planned</strong>
                  }
                  {' '}
                  by
                  {' '}
                  <a href={`mailto:${user.email}`}>{user.name}</a>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
