import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { selectTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currentTodos = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   setIsLoading(true);
  //   if (currentTodos) {
  //     getUser(currentTodos?.userId)
  //       .then(setUser)
  //       // eslint-disable-next-line no-console
  //       .catch(error => console.log(error.message))
  //       .finally(() => setIsLoading(false));
  //   }
  // }, [currentTodos]);

  const findUser = useCallback(() => {
    setIsLoading(true);
    if (currentTodos) {
      getUser(currentTodos?.userId)
        .then(setUser)
        // eslint-disable-next-line no-console
        .catch(error => console.log(error.message))
        .finally(() => setIsLoading(false));
    }
  }, [currentTodos]);

  useEffect(() => {
    findUser();
  }, [findUser]);

  const onCloseHandler = useCallback(() => {
    dispatch(selectTodo(null));
  }, [dispatch]);

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
              {`Todo #${currentTodos?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onCloseHandler}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodos?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!currentTodos?.completed ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}

              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
