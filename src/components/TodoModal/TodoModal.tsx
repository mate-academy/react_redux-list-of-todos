import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { useAppDispatch } from '../../app/hooks';
import { getUser } from '../../api';
import { notificationTimer } from '../../utils/notificationTimer';
import { actions as todoActions } from '../../features/currentTodo';

type Props = {
  todo: Todo;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export const TodoModal: React.FC<Props> = ({ todo, setError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const fetchedUser = await getUser(todo.userId);

        setUser(fetchedUser);
      } catch (error) {
        setError(`${error}`);
        notificationTimer(setError, '', 3000);
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
                {`Todo #${todo.id}`}
              </div>

              <button
                type="button"
                aria-label="closeModalButton"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(todoActions.removeTodo())}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">{todo.title}</p>

              <p className="block" data-cy="modal-user">
                {!todo.completed
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
