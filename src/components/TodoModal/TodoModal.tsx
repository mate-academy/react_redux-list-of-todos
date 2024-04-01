import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import classNames from 'classnames';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);

    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(userFromServer => setUser(userFromServer))
        .finally(() => setIsLoading(false));
    }
  }, [currentTodo]);

  const removeCurrentTodo = () => {
    dispatch(actions.removeTodo());
    setUser(null);
  };

  return (
    <>
      {currentTodo && (
        <div
          data-cy="modal"
          className={classNames('modal', { 'is-active': !!currentTodo })}
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
