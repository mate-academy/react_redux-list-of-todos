import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);

      if (currentTodo) {
        try {
          const user = await getUser(currentTodo.userId);

          setCurrentUser(user);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading || !currentUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(setCurrentTodo(null))}
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
              <a href={`mailto:${currentUser?.email}`}>{currentUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
