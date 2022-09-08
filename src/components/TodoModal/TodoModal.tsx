import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { TODO_ID_ACTIONS_CREATOR } from '../../features/currentTodoId';
import { SELECTORS } from '../../selectors/selectors';
import { USER_ACTIONS_CREATOR } from '../../features/currentUser';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const currentTodo = useSelector(SELECTORS.currentTodoSelector);
  const { user, isLoading } = useSelector(SELECTORS.currentUserSelector);

  useEffect(() => {
    if (currentTodo) {
      dispatch(USER_ACTIONS_CREATOR.setUserIsLoading(true));

      getUser(currentTodo.userId)
        .then(userFS => dispatch(USER_ACTIONS_CREATOR.setUser(userFS)))
        .catch()
        .finally(() => dispatch(USER_ACTIONS_CREATOR.setUserIsLoading(false)));
    }
  }, []);

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
              onClick={() => dispatch(TODO_ID_ACTIONS_CREATOR.removeTodoId())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              {user && (
                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
