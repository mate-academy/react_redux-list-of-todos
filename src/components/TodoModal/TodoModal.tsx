import React from 'react';
// import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Loader } from '../Loader';
import { setCurrentTodo, setCurrentUser } from '../../features/currentTodo';

export const TodoModal: React.FC = ({}) => {
  const currentTodo = useSelector((state: RootState) => state.currentTodo.todo);
  const currentUser = useSelector((state: RootState) => state.currentTodo.user);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setCurrentTodo(null));
    dispatch(setCurrentUser(null));
  };

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!currentUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>

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
  );
};
