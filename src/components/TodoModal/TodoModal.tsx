import { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.currentTodo);

  const handleCloseModal = () => {
    dispatch(currentTodoSlice.actions.setCurrentTodo(null));
  };

  useEffect(() => {
    if (todo) {
      setLoading(true);

      getUser(todo.userId)
        .then(setUser)
        .finally(() => setLoading(false));
    }
  }, [todo]);

  if (!todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                })}
              >
                {todo.completed ? `Done` : `Planned`}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
