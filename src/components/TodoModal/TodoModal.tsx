import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deselectTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currTodo = useAppSelector(state => state.currTodo.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);

    if (currTodo) {
      getUser(currTodo.userId)
        .then(setUser)
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false); // на випадок, якщо currTodo не існує
    }
  }, [currTodo]);

  return (
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
              {`Todo #${currTodo?.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(deselectTodo());
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  currTodo?.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {currTodo?.completed ? 'Done' : 'Planned'}
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
