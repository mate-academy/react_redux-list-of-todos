import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setModalVisibility } from '../../features/todos';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const { modalVisible, selectedTodo } = useSelector(
    (state: RootState) => state.todos
  );

  const handleCloseModal = () => {
    dispatch(setModalVisibility(false));
  };

  if (!modalVisible || !selectedTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleCloseModal} />

      <Loader />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{selectedTodo.id}
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
            {selectedTodo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {/* Handle completion status */}
            <strong className={selectedTodo.completed ? 'has-text-success' : 'has-text-danger'}>
              {selectedTodo.completed ? 'Done' : 'Planned'}
            </strong>
            {/* Use a placeholder if no user information */}
            {' by '}<a href="mailto:someone@example.com">Unknown User</a>
          </p>
        </div>
      </div>
    </div>
  );
};
