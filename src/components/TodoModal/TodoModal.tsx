import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

type Props = {
  userId: number;
  todo: Todo;
};

export const TodoModal = ({ userId, todo }: Props) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const userDataRes = await getUser(userId);

        setUserData(userDataRes);
      } catch (error) {
        throw new Error(`Unable to fetch todos. Error: ${error}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isLoading && userData ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
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
              fugiat veniam minus
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${userData.email}`}>{userData.name}</a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
