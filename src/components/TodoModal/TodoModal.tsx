import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useDispatch } from 'react-redux';
import { currentTodoReducer } from '../../features/currentTodo';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const handleClose = () => {
    dispatch(currentTodoReducer(null));
  };

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(setUser)
        .catch(() => {
          throw new Error("Can't get User information");
        })
        .finally(() => setIsLoading(false));
    }
  }, [currentTodo]);

  return (
    !!currentTodo && (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />
        {isLoading ? (
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
                onClick={handleClose}
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
    )
  );
};
