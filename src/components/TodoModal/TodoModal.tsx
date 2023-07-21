import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { TotoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User>({
    email: '',
    id: 0,
    name: '',
    phone: '',
  });

  useEffect(() => {
    setIsLoader(true);

    if (!currentTodo) {
      return;
    }

    getUser(currentTodo.userId)
      .then((res) => {
        setUser(res);
      })
      .finally(() => setIsLoader(false));
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoader ? (
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

            <button
              aria-label="Close button"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(TotoActions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className={classNames({
                  'has-text-success': currentTodo?.completed,
                })}
                >
                  Done
                </strong>
              ) : (
                <strong className={classNames({
                  'has-text-danger': !currentTodo?.completed,
                })}
                >
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
