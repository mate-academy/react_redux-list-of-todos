import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as todoActions } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const loadUser = async () => {
    setIsLoading(true);
    try {
      if (currentTodo) {
        const userFromServer = await getUser(currentTodo.userId);

        setUser(userFromServer);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading
        ? (<Loader />)
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${currentTodo?.id}`}
              </div>

              <button
                type="button"
                aria-label="remove"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(todoActions.removeTodo())}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {currentTodo?.completed === true
                  ? (<strong className="has-text-success">Done</strong>)
                  : (<strong className="has-text-danger">Planned</strong>)}
                {' by '}
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
