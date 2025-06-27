import React from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo.currentItem);
  const loaderStatus = useAppSelector(state => state.currentTodo.loadingModal);
  const user = useAppSelector(state => state.currentTodo.user);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loaderStatus && <Loader />}

      {!loaderStatus && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo ? currentTodo.id : ''}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(selectTodo(null))}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo ? currentTodo.title : ''}
            </p>

            {currentTodo && (
              <p className="block" data-cy="modal-user">
                {/* For not completed */}
                {currentTodo.completed ? (
                  <strong className="has-text-completed">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}
                {' by '}
                {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
