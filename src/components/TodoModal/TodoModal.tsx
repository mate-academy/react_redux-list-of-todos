import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dummyUser: User = {
    id: 0,
    name: 'Placeholder',
    email: 'Placeholder',
    phone: 'Placeholder',
  };
  const [currentUser, setCurrentUser] = useState<User>(dummyUser);
  const [isLoading, setIsLoading] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const loadCurrentUser = async () => {
    if (currentTodo) {
      try {
        setIsLoading(true);
        const user = await getUser(currentTodo.userId);

        setCurrentUser(user);
      } catch {
        throw new Error('An error has occured while loading user');
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { id, title, completed } = currentTodo!;
  const { email, name } = currentUser;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && (<Loader />)}
      {currentUser && currentTodo && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
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
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={`has-text-${completed ? 'success' : 'danger'}`}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${email}`}>
                {name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
