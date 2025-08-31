import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { setSingleTodo } from '../../features/currentTodo';
import { useDispatch } from 'react-redux';

type Props = {
  error: string | null;
  setError: (error: string | null) => void;
};

export const TodoModal: React.FC<Props> = ({ error, setError }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  const singleTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoaded(true);
    setError(null);
    if (singleTodo?.userId !== undefined) {
      getUser(singleTodo?.userId)
        .then(data => setUserData(data))
        // eslint-disable-next-line no-console
        .catch(() => setError('Something went wrong. Please try again later.'))
        .finally(() => setIsLoaded(false));
    }
  }, [singleTodo, setError]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${singleTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(setSingleTodo(null))}
            />
          </header>

          <div className="modal-card-body">
            {error && (
              <div className="notification is-danger" data-cy="modal-error">
                {error}
              </div>
            )}
            {!error && (
              <>
                <p className="block" data-cy="modal-title">
                  {singleTodo?.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {singleTodo?.completed ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}

                  {' by '}

                  <a href={`mailto:${userData?.email}`}>{userData?.name}</a>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
