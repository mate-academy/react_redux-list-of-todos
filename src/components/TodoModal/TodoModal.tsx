import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../hooks';
import { getUser } from '../../api/api';
import { useDispatch } from 'react-redux';
import { User } from '../../types/User';
import { setCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const changeCurrentTodo = (todo: Todo | null) =>
    dispatch(setCurrentTodo(todo));

  useEffect(() => {
    if (!currentTodo?.userId) {
      return;
    }

    setIsLoading(true);
    setHasError(false);

    getUser(currentTodo.userId)
      .then(res => setCurrentUser(res))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [currentTodo?.userId]);

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {hasError && (
        <div className="modal-card">
          <section className="modal-card-body">
            <p className="has-text-danger">Oops, there is some error</p>
          </section>
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => changeCurrentTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            {isLoading ? (
              <Loader />
            ) : (
              <>
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
                  <a href={`mailto:${currentUser?.email}`}>
                    {currentUser?.name}
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
