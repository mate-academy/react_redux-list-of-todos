import { FC, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

type Props = {
  currentTodo: Todo;
};

export const TodoModal: FC<Props> = ({
  currentTodo: {
    id, title, completed, userId,
  },
}) => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);

  const loadUser = async (idUser: number) => {
    try {
      const loadedUser = await getUser(idUser);

      setUser(loadedUser);
    } catch {
      throw new Error('Loading user error');
    }
  };

  useEffect(() => {
    loadUser(userId);
  }, []);

  const handleModalClose = () => dispatch(actions.removeTodo());

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <button
              aria-label="Close button"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleModalClose}
            />
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
              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
