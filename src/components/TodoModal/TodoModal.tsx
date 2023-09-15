import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { actions as CurrentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setIsLoading(true);

    getUser(selectedTodo.userId)
      .then(userFromServer => {
        setUser(userFromServer);
      })
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, [selectedTodo]);

  return (
    <>
      {selectedTodo && (
        <div
          className={cn('modal', {
            'is-active': selectedTodo,
          })}
          data-cy="modal"
        >
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
                  {`Todo #${selectedTodo?.id}`}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => dispatch(CurrentTodoActions.removeTodo())}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {selectedTodo?.title}
                </p>

                <p className="block" data-cy="modal-user">
                  <strong
                    className={cn({
                      'has-text-danger': !selectedTodo?.completed,
                      'has-text-success': selectedTodo?.completed,
                    })}
                  >
                    {selectedTodo?.completed ? 'Done' : 'Planned'}
                  </strong>

                  {' by '}
                  {user ? (
                    <a href={`mailto:${user.email}`}>{user.name}</a>
                  ) : (
                    <span>Anonim</span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
