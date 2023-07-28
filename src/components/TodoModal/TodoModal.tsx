import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (selectedTodo) {
          const loadedUser = await getUser(selectedTodo.userId);

          setUser(loadedUser);
        }
      } catch (error) {
        throw new Error('User not found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [selectedTodo]);

  const { id, title, completed } = selectedTodo || {};
  const { email, name } = user || {};

  const handleCloseModal = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
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
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="delete"
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed
                ? <strong className="has-text-success">Done </strong>
                : <strong className="has-text-danger">Planned </strong>}
              <a href={`mailto:${email}`}>
                {`by ${name}`}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
