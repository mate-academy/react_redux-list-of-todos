import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Loader } from '../Loader';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const removeCurrentTodo = () => {
    dispatch(actions.removeTodo());
    setUser(null);
  };

  useEffect(() => {
    setIsLoading(true);

    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(userFromServer => setUser(userFromServer))
        .finally(() => setIsLoading(false));
    }
  }, [currentTodo]);

  return (
    <>
      {currentTodo && (
        <div
          data-cy="modal"
          className={cn('modal', { 'is-active': !!currentTodo })}
        >
          <div className="modal-background" />

          {isLoading ? (
            <Loader />
          ) : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  data-cy="modal-header"
                  className="modal-card-title has-text-weight-medium"
                >
                  Todo #{currentTodo.id}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  data-cy="modal-close"
                  className="delete"
                  onClick={() => removeCurrentTodo()}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {currentTodo.title}
                </p>

                {user && (
                  <p className="block" data-cy="modal-user">
                    {currentTodo.completed ? (
                      <strong className="has-text-success">Done</strong>
                    ) : (
                      <strong className="has-text-danger">Planned</strong>
                    )}
                    {' by '}
                    <a href={`mailto:${user.email}`}>{user.name}</a>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
