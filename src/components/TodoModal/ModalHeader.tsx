import React from 'react';

interface Props {
  todoId: number;
  onClose: () => void;
}

export const ModalHeader: React.FC<Props> = ({ todoId, onClose }) => (
  <header className="modal-card-head">
    <div
      className="modal-card-title has-text-weight-medium"
      data-cy="modal-header"
    >
      Todo #{todoId}
    </div>

    <button
      type="button"
      className="delete"
      data-cy="modal-close"
      onClick={onClose}
    />
  </header>
);
