import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { selectors } from '../../store';
import { todoActions } from '../../store/currentTodo';
import { userActions } from '../../store/user';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTodo = useSelector(selectors.selectedTodo);
  const selectedUser = useSelector(selectors.currentTodoUser);

  useEffect(() => {
    getUser(selectedTodo.userId).then(userFromServer => {
      dispatch(userActions.SetUser(userFromServer));
    });
  }, []);

  return (
    <div
      className="modal is-active"
      data-cy="modal"
    >
      <div className="modal-background" />

      {!selectedUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(userActions.RemoveUser());
                dispatch(todoActions.RemoveTask());
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${selectedUser.email}`}>
                {selectedUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
