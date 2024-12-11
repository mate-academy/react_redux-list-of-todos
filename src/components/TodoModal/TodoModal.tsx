import React, { useEffect, useState } from 'react';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const dispatch = useDispatch();
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    if (currentTodo) {
      setIsLoading(true);

      getUser(currentTodo?.userId)
        .then(setUserData)
        .catch(error => {
          throw error;
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      {!isLoading && (
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
              onClick={() => dispatch(currentTodoActions.clearCurrentTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!currentTodo?.completed ? (
                <>
                  {/* For not completed */}
                  <strong className="has-text-danger">Planned</strong>
                </>
              ) : (
                <>
                  {/* For completed */}
                  <strong className="has-text-success">Done</strong>
                </>
              )}
              {' by '}
              <a href="mailto:Sincere@april.biz">{userData?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
