import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { removeTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const currentTodo: Todo | null = useAppSelector((state) => state.currentTodo);

  useEffect(() => {
    if (currentTodo?.userId) {
      getUser(currentTodo.userId)
        .then((userData: User) => {
          setUser(userData);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [currentTodo?.userId]);

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading
        ? (<Loader />)
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${currentTodo?.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(removeTodo())}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {currentTodo.completed
                  ? (<strong className="has-text-success">Done</strong>)
                  : (<strong className="has-text-danger">Planned</strong>)}

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
