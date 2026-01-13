import { Loader } from '../Loader';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  fetchUserFailed,
  fetchUserSuccesfull,
  startFetch,
  unsetCurrentTodo,
} from '../../features/currentTodo';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useEffect } from 'react';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const { loadingUser, user, currentTodo } = useAppSelector(
    state => state.currentTodo,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function loadUser() {
      dispatch(startFetch());
      if (!currentTodo) {
        return;
      }

      try {
        const data = await getUser(currentTodo.userId);

        dispatch(fetchUserSuccesfull(data));
      } catch (err) {
        dispatch(fetchUserFailed(err));
      }
    }

    loadUser();
  }, [currentTodo, dispatch]);

  return (
    <div className={`modal ${currentTodo ? 'is-active' : ''}`} data-cy="modal">
      <div className="modal-background" />
      {loadingUser ? (
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

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(unsetCurrentTodo());
              }}
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
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
