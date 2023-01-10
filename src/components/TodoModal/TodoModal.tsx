import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import {
  useAppDispatch,
  useAppSelector,
} from '../../app/hooks';
import { actions as todoActions } from '../../features/currentTodo';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentTodo = useAppSelector(state => state.currentTodo);

  const [user, setUser] = useState<User | null>(null);

  const handleCloseTodo = () => {
    dispatch(todoActions.removeTodo());
  };

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(currentUser => setUser(currentUser));
    }
  }, []);

  return (
    <div
      className="modal is-active"
      data-cy="modal"
    >
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="
                modal-card-title
                has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo?.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="delete"
              onClick={() => handleCloseTodo()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed
                ? (
                  <strong className="has-text-success">
                    Done
                  </strong>
                ) : (
                  <strong className="has-text-danger">
                    Planned
                  </strong>
                )}

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
