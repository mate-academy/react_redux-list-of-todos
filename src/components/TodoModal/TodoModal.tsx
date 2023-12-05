import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentTodo) {
      setLoading(true);
      getUser(currentTodo.userId)
        .then(setUser)
        .finally(() => setLoading(false));
    }
  }, [currentTodo]);

  const handleCloseModal = () => (
    dispatch(currentTodoActions.removeTodo())
  );

  return (
    <div
      className={classNames('modal', { ' is-active': currentTodo })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {loading && (
        <Loader />
      )}

      {!loading && (
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
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

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
