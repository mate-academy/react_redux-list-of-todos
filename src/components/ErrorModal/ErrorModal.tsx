import React from 'react';

type Props = {
  message: string;
};

export const ErrorModal: React.FC<Props> = ({ message }) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-content">
        <div className="box has-text-centered">
          <p className="title is-3 has-text-danger">{message}</p>
          <button
            type="button"
            className="button is-primary"
            onClick={handleReload}
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};
