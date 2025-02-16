import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { setCurrentTodo } from '../../features/currentTodo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const currentTodo = useSelector((state: RootState) => state.currentTodo.todo);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseTodo = () => {
    dispatch(setCurrentTodo(null));
  };

  useEffect(() => {
    if (currentTodo) {
      setIsLoading(true);
      setCurrentUser(null); // Reset user when loading a new todo

      getUser(currentTodo.userId)
        .then(response => {
          setCurrentUser(response);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error('Error fetching user:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        currentUser && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{currentTodo.id}
              </div>
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={handleCloseTodo}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {!currentTodo.completed ? (
                  <strong className="has-text-danger">Planned</strong>
                ) : (
                  <strong className="has-text-success">Done</strong>
                )}
                {' by '}
                <a href={`mailto:${currentUser.email}`}>{currentUser.name}</a>
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};
