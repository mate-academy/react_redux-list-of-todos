import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { Todo } from '../../types/Todo';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentTodo = useSelector((state: RootState) => state.currentTodo.todo);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id, title, completed, userId } = currentTodo as Todo;

  useEffect(() => {
    setIsLoading(true);

    getUser(userId)
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        user && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{id}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(setCurrentTodo(null))}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                {completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}
                {' by '}

                <a href={`mailto:${user.email}`}>{user.name}</a>
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};
