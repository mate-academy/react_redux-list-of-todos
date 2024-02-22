import { useSignals } from '@preact/signals-react/runtime';
import { effect, signal } from '@preact/signals-react';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { selectedTodo, user } from '../../signals';

const modalLoading = signal<boolean>(true);

effect(() => {
  if (selectedTodo.value) {
    getUser(selectedTodo.value.userId)
      .then(t => {
        user.value = t;
      })
      .then(() => {
        modalLoading.value = false;
      });
  }
});

export const TodoModal: React.FC = () => {
  useSignals();

  const handleCloseModal = () => {
    selectedTodo.value = null;
    user.value = null;
    modalLoading.value = true;
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {modalLoading.value ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.value?.id}`}
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
              {selectedTodo.value?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.value?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user.value?.email}`}>{user.value?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
