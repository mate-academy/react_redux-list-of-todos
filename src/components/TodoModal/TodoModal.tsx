import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const todo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    if (todo) {
      getUser(todo.userId).then(result => {
        setUser(result);
      }).catch(() => {
        setHasError(true);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, []);

  const { name, email } = user || {}

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div className="modal-card-title has-text-weight-medium" data-cy="modal-header">
              {`Todo #${todo?.id}`}
            </div>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(actions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            {hasError ? (
              <strong className="has-text-danger">Unable to load the user</strong>
            ) : (
              <>
                <p className="block" data-cy="modal-title">{todo?.title}</p>
                <p className="block" data-cy="modal-user">
                  {todo?.completed ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}
                  {' by '}
                  <a href={`mailto:${email}`}>{name}</a>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
