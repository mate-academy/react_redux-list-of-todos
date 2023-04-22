import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { warningTimer } from '../../utils/warningTimer';
import { useAppDispatch } from '../../app/hooks';
import { actions as todoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  currentTodo: Todo;
  setIsHasError: (value: string) => void;
};

export const TodoModal: React.FC<Props> = ({ currentTodo, setIsHasError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const userData = await getUser(currentTodo.userId);

        setUser(userData);
      } catch (error) {
        setIsHasError(`${error}`);
        warningTimer(setIsHasError, '', 3000);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading
        ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${currentTodo.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(todoActions.removeTodo())}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">{currentTodo.title}</p>

              <p className="block" data-cy="modal-user">
                {!currentTodo.completed
                  ? <strong className="has-text-danger">Planned</strong>
                  : <strong className="has-text-success">Done</strong>}
                {' by '}
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
