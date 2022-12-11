import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    userId,
    completed,
  } = todo;

  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const loadedUser = await getUser(userId);

        setUser(loadedUser);
      } catch (e) {
        throw new Error('User not found');
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [dispatch]);

  const closeModal = () => dispatch(currentTodoActions.removeTodo());

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
                {`Todo #${id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={closeModal}
              />
            </header>

            <div className="modal-card-body">
              <p
                className="block"
                data-cy="modal-title"
              >
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                {!completed
                  ? <strong className="has-text-danger">Planned</strong>
                  : <strong className="has-text-success">Done</strong>
                }
                {' by '}
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
