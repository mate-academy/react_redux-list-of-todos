import { FC, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { User } from '../../types/User';
import { actions } from '../../features/currentTodo';
import { getUser } from '../../api';

export const TodoModal: FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const todo = useAppSelector(state => state.currentTodo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!todo?.userId) {
      return;
    }

    getUser(todo.userId)
      .then(setUser)
      .catch(() => {});
  }, [todo?.userId, dispatch]);

  const emailUser = `mailto:${user?.email}`;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {!user && <Loader />}

      {user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(actions.removeTodo())}
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
              <a href={emailUser}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
