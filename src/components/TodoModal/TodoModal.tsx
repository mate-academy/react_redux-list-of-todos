import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setTodo, setTodoLoading } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodos.item);
  const currentLoading = useAppSelector(state => state.currentTodos.loading);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (currentTodo?.userId) {
      dispatch(setTodoLoading(true));
      getUser(currentTodo.userId)
        .then((user: User) => setCurrentUser(user))
        .finally(() => dispatch(setTodoLoading(false)));
    } else {
      setCurrentUser(undefined);
    }
  }, [currentTodo, dispatch]);

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {currentLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(setTodo(null))}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed === false ? (
                <>
                  {/* For not completed */}
                  <strong className="has-text-danger">Planned</strong>
                  {' by '}
                  <a href={`mailto:${currentUser?.email}`}>
                    {currentUser?.name}
                  </a>
                </>
              ) : (
                <>
                  {/* For completed */}
                  <strong className="has-text-success">Done</strong>
                  {' by '}
                  <a href={`mailto:${currentUser?.email}`}>
                    {currentUser?.name}
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
