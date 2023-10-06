import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { actions as currentTodoAction } from '../../features/currentTodo';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentTodo) {
      setIsLoading(true);
      getUser(currentTodo.userId)
        .then((user) => setCurrentUser(user))
        .finally(() => setIsLoading(false));
    }
  }, []);

  const handleRemoveTodo = () => {
    dispatch(currentTodoAction.removeTodo());
  }

  return (
    <>
      {currentTodo && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />

          {isLoading ? (
            <Loader />
          ) : currentUser && (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${currentTodo.id}`}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => handleRemoveTodo()}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {currentTodo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {currentTodo.completed ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}

                  {' by '}

                  <a href={`mailto:${currentUser.email}`}>{currentUser.name}</a>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
