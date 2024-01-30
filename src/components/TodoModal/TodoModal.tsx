import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentTodo) {
      setIsLoading(true);
      getUser(currentTodo.userId)
        .then(setUser)
        .finally(() => setIsLoading(false));
    }
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {
        isLoading
          ? <Loader />
          : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  Todo #
                  {currentTodo?.id}
                </div>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => dispatch(currentTodoActions.removeTodo())}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {currentTodo?.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {
                    currentTodo?.completed
                      ? <strong className="has-text-success">Done</strong>
                      : <strong className="has-text-danger">Planned</strong>
                  }
                  {' by '}
                  <a href={`mailto:${user?.email}`}>{user?.name}</a>
                </p>
              </div>
            </div>
          )
      }
    </div>
  );
};
