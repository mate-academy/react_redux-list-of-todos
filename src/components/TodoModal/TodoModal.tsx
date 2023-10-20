import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { actions as currentActions } from '../../features/currentTodo';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const [users, setUsers] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const removeTodo = () => dispatch(currentActions.removeTodo());

  useEffect(() => {
    setLoading(true);
    if (currentTodo) {
      getUser(currentTodo?.userId)
        .then(setUsers)
        .finally(() => setLoading(false));
    }
  }, [currentTodo]);

  return (
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
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => removeTodo()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}

              {' by '}

              {users && (
                <a href={`${users.email}`}>
                  {users.name}
                </a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
