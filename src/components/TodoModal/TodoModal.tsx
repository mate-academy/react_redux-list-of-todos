import { memo, useCallback, useEffect, useState } from 'react';
import { getUser } from '../../api';
import { store, useAppSelector } from '../../app/store';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const todo: Todo | null = useAppSelector(state => state.currentTodo);

  const fetchUser = useCallback(() => {
    if (!todo) {
      return;
    }

    setLoading(true);
    setUser(null);
    setFetchError(null);

    getUser(todo.userId)
      .then((fetchedUser: User) => setUser(fetchedUser))
      .catch(error => setFetchError(error.message))
      .finally(() => setLoading(false));
  }, [todo]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleClose = useCallback(() => {
    store.dispatch(currentTodoActions.setCurrentTodo(null));
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setFetchError(null);
    fetchUser();
  };

  return !todo ? (
    <></>
  ) : (
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
              Todo #{todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            {fetchError ? (
              <>
                <div className="notification is-danger">{fetchError}</div>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="button is-link mt-4"
                >
                  Reload user data
                </button>
              </>
            ) : (
              <p className="block" data-cy="modal-user">
                {todo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(TodoModal);
