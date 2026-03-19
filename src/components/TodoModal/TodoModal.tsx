import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { currentTodoSlice } from '../../features/currentTodo';
export const TodoModal: React.FC = () => {
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = useState<null | User>(null);
  const { clearCurrentTodo } = currentTodoSlice.actions;

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(userFromServer => {
          setUser(userFromServer);
        })

        .catch(error => {
          // eslint-disable-next-line no-console
          console.error('Помилка завантаження:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentTodo]);

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
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(clearCurrentTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
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
