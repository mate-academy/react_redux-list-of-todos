import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getUser } from '../../api';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo) as Todo;
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUser(currentTodo.userId)
      .then((givenUser) => {
        setUser(givenUser);
      })
      .finally(() => setIsLoading(false));
  }, [currentTodo]);

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
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(actions.setTodo(null))}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={currentTodo?.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
              >
                {currentTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}
              {user && (
                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
