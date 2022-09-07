import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { TODO_ACTIONS } from '../../features/currentTodo';
import { CURRENT_TODOS_SELECTORS, USER_SELECTORS } from '../../app/selectors';
import { Loader } from '../Loader';
import { USER_ACTIONS } from '../../features/user';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(CURRENT_TODOS_SELECTORS.currentTodo);
  const currentUser = useAppSelector(USER_SELECTORS.user);
  const dispatch = useDispatch();

  const isLoading = (currentTodo === null)
    || (currentUser?.id !== currentTodo.userId);

  const handleCloseModal = () => {
    dispatch(TODO_ACTIONS.removeTodo());
    dispatch(USER_ACTIONS.removeUser());
  };

  useEffect(() => {
    if (currentTodo?.userId) {
      dispatch(USER_ACTIONS.loadUserByIdFromServer(currentTodo.userId));
    }
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading
        ? (<Loader />)
        : (
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
                onClick={handleCloseModal}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {currentTodo.completed
                  ? (
                    <strong className="has-text-success">
                      Done
                    </strong>
                  ) : (
                    <strong className="has-text-danger">
                      Planned
                    </strong>
                  )}

                {' by '}
                {
                  currentUser
                    ? (
                      <a href={`mailto:${currentUser.email}`}>
                        {currentUser.name}
                      </a>
                    )
                    : 'Anonimous'
                }
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
