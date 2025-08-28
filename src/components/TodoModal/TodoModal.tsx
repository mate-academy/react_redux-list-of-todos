import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { clearCurrentTodo } from '../../features/currentTodo';
import { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../hooks';

type Props = {
  // todo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const dispatch = useAppDispatch();
  const todo = useAppSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    if (!todo?.userId) {
      return;
    }

    setIsLoading(true);
    getUser(todo?.userId).then(userData => {
      setUser(userData);
      setIsLoading(false);
    });
  }, [todo?.userId]);

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
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(clearCurrentTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
