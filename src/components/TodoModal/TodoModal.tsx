import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { ButtonModal } from '../ButtonModal';
import { Error } from '../Error';
import { Loader } from '../Loader';

type Props = {
  todo: Todo
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const getUserFromServer = async () => {
    try {
      setIsLoading(true);

      const result = await getUser(userId);

      setUser(result);
    } catch (error: unknown) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserFromServer();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoading && <Loader />}
      {isError && (
        <Error>
          User not found
          <ButtonModal />
        </Error>
      )}

      {user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <ButtonModal />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">

              {completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
